import { useCallback, useEffect, useMemo, useState } from "react";
import { TopNav } from "../components/top-nav";
import {
  createReport,
  createSession,
  getReport,
} from "../../services/safespaceApi";
import { getSessionId, setSessionId } from "../../services/storage";

interface ReportData {
  id: string;
  session_id: string;
  location: string;
  perpetrator: string;
  description: string;
  evidence: string;
  user_goal: string;
  generated_document: string | null;
  created_at: string;
}

const stepMappers = {
  step1: {
    workplace: "workplace",
    campus: "kampus",
    online: "online",
    public: "public space",
  },
  step3: {
    comments: "inappropriate comments",
    physical: "unwanted physical touch",
    pressure: "repeated pressure",
    coercion: "threat or coercion",
    digital: "digital harassment",
  },
  step5: {
    risk: "understand the risk",
    document: "document safely",
    reporting: "consider reporting",
    explore: "explore options",
  },
} as const;

const getAssessmentPayload = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const step1 = sessionStorage.getItem("step1");
  const step2 = sessionStorage.getItem("step2");
  const step3 = sessionStorage.getItem("step3");
  const step4 = sessionStorage.getItem("step4");
  const step5 = sessionStorage.getItem("step5");

  const location = step1
    ? stepMappers.step1[step1 as keyof typeof stepMappers.step1]
    : undefined;
  const description = step3
    ? stepMappers.step3[step3 as keyof typeof stepMappers.step3]
    : undefined;
  const userGoal = step5
    ? stepMappers.step5[step5 as keyof typeof stepMappers.step5]
    : undefined;

  if (!location || !step2 || !description || !step4 || !userGoal) {
    return null;
  }

  return {
    location,
    perpetrator: step2,
    description,
    evidence: step4,
    user_goal: userGoal,
  };
};

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Tidak tersedia";
  }

  return date.toLocaleString("id-ID", {
    dateStyle: "long",
    timeStyle: "short",
  });
};

const formatErrorMessage = (error: unknown) => {
  if (!error || typeof error !== "object") {
    return "Terjadi kesalahan yang tidak diketahui.";
  }

  const normalizedError = error as {
    status?: number;
    message?: string;
  };

  const statusText =
    typeof normalizedError.status === "number" && normalizedError.status > 0
      ? ` (${normalizedError.status})`
      : "";

  return `${normalizedError.message ?? "Permintaan gagal."}${statusText}`;
};

export function Report() {
  const [report, setReport] = useState<ReportData | null>(null);
  const [sessionId, setCurrentSessionId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const ensureSession = useCallback(async () => {
    const persistedSessionId = getSessionId();

    if (persistedSessionId) {
      setCurrentSessionId(persistedSessionId);
      return persistedSessionId;
    }

    const newSession = await createSession();
    setSessionId(newSession.session_id);
    setCurrentSessionId(newSession.session_id);
    return newSession.session_id;
  }, []);

  const loadOrCreateReport = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const activeSessionId = await ensureSession();

      try {
        const existingReport = await getReport(activeSessionId);
        setReport(existingReport);
        return;
      } catch (error) {
        const status =
          error && typeof error === "object"
            ? (error as { status?: number }).status
            : 0;

        if (status !== 404) {
          throw error;
        }
      }

      const assessmentPayload = getAssessmentPayload();

      if (!assessmentPayload) {
        setErrorMessage(
          "Data assessment belum lengkap. Selesaikan assessment untuk membuat laporan.",
        );
        return;
      }

      setIsGenerating(true);
      const generatedReport = await createReport({
        sessionId: activeSessionId,
        report: assessmentPayload,
      });
      setReport(generatedReport);
    } catch (error) {
      setErrorMessage(formatErrorMessage(error));
    } finally {
      setIsGenerating(false);
      setIsLoading(false);
    }
  }, [ensureSession]);

  useEffect(() => {
    void loadOrCreateReport();
  }, [loadOrCreateReport]);

  const reportText = useMemo(() => {
    if (!report) {
      return "";
    }

    if (report.generated_document) {
      return report.generated_document;
    }

    return [
      `Lokasi: ${report.location}`,
      `Pelaku: ${report.perpetrator}`,
      `Deskripsi: ${report.description}`,
      `Bukti: ${report.evidence}`,
      `Tujuan: ${report.user_goal}`,
    ].join("\n");
  }, [report]);

  const handleCopy = useCallback(() => {
    if (!reportText) return;

    navigator.clipboard.writeText(reportText).then(() => {
      alert("Laporan berhasil disalin ke clipboard");
    });
  }, [reportText]);

  const handleExport = () => {
    alert("Fitur ekspor PDF akan tersedia pada versi berikutnya");
  };

  const handleSave = () => {
    alert("Laporan berhasil disimpan secara aman");
  };

  const isBusy = isLoading || isGenerating;

  const generatedAtLabel = report?.created_at
    ? `Dibuat: ${formatDate(report.created_at)}`
    : "Dibuat: Tidak tersedia";

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <TopNav showBack variant="light" />

      <main className="pt-20 pb-8 px-5 max-w-md mx-auto">
        <h2 className="text-2xl text-[#3A4556] mb-6 leading-snug">
          Laporan Terstruktur
        </h2>

        {/* Report Content */}
        <div
          id="report-content"
          className="bg-white p-6 rounded-xl border border-[#E8ECF3] shadow-sm mb-6 space-y-6"
        >
          <p className="text-xs text-[#6B7684] break-all">
            Session: {sessionId || "Belum tersedia"}
          </p>

          {isBusy ? (
            <p className="text-sm text-[#6B7684]">
              {isGenerating
                ? "Menyusun laporan dari assessment..."
                : "Memuat laporan..."}
            </p>
          ) : null}

          {errorMessage ? (
            <p className="text-sm text-[#C84545]">{errorMessage}</p>
          ) : null}

          {report ? (
            <div>
              <h3 className="text-sm font-medium text-[#596577] mb-2">
                Ringkasan Data API
              </h3>
              <p className="text-[#3A4556] leading-relaxed whitespace-pre-line">
                {reportText}
              </p>
            </div>
          ) : null}

          {/* Incident Summary */}
          <div>
            <h3 className="text-sm font-medium text-[#596577] mb-2">
              Ringkasan Kejadian
            </h3>
            <p className="text-[#3A4556] leading-relaxed">
              Pelecehan berbasis tempat kerja yang melibatkan atasan. Kejadian
              mencakup komentar tidak pantas dengan bukti yang tersedia melalui
              pesan.
            </p>
          </div>

          {/* Timeline Structure */}
          <div>
            <h3 className="text-sm font-medium text-[#596577] mb-2">
              Struktur Kronologi
            </h3>
            <ul className="space-y-2 text-[#3A4556] leading-relaxed">
              <li className="flex gap-3">
                <span className="text-[#596577] flex-shrink-0">-</span>
                <span>Kejadian awal terjadi di lingkungan tempat kerja</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#596577] flex-shrink-0">-</span>
                <span>Pola kejadian teridentifikasi dari waktu ke waktu</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#596577] flex-shrink-0">-</span>
                <span>Bukti telah dikumpulkan dan diamankan</span>
              </li>
            </ul>
          </div>

          {/* Risk Assessment */}
          <div>
            <h3 className="text-sm font-medium text-[#596577] mb-2">
              Penilaian Risiko
            </h3>
            <p className="text-[#3A4556] leading-relaxed mb-3">
              Tingkat risiko sedang diidentifikasi berdasarkan:
            </p>
            <ul className="space-y-2 text-[#3A4556] leading-relaxed">
              <li className="flex gap-3">
                <span className="text-[#596577] flex-shrink-0">-</span>
                <span>Terdapat ketimpangan kuasa</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#596577] flex-shrink-0">-</span>
                <span>Bukti terdokumentasi tersedia</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#596577] flex-shrink-0">-</span>
                <span>Potensi pembalasan di lingkungan kerja</span>
              </li>
            </ul>
          </div>

          {/* Power Imbalance Context */}
          <div>
            <h3 className="text-sm font-medium text-[#596577] mb-2">
              Konteks Ketimpangan Kuasa
            </h3>
            <p className="text-[#3A4556] leading-relaxed">
              Terdeteksi ketimpangan kuasa tinggi. Relasi atasan-bawahan
              menciptakan kerentanan struktural dan meningkatkan risiko
              pembalasan.
            </p>
          </div>

          {/* Suggested Escalation Path */}
          <div>
            <h3 className="text-sm font-medium text-[#596577] mb-2">
              Rekomendasi Jalur Tindak Lanjut
            </h3>
            <ol className="space-y-2 text-[#3A4556] leading-relaxed">
              <li className="flex gap-3">
                <span className="text-[#596577] flex-shrink-0">1.</span>
                <span>
                  Dokumentasikan seluruh kejadian beserta waktu kejadiannya
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#596577] flex-shrink-0">2.</span>
                <span>Simpan seluruh bukti secara aman</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#596577] flex-shrink-0">3.</span>
                <span>Pertimbangkan pelaporan internal melalui HR</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#596577] flex-shrink-0">4.</span>
                <span>
                  Jelajahi pendampingan hukum eksternal bila diperlukan
                </span>
              </li>
            </ol>
          </div>

          {/* Report metadata */}
          <div className="pt-4 border-t border-[#E8ECF3]">
            <p className="text-xs text-[#596577]">{generatedAtLabel}</p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleCopy}
            disabled={!report || isBusy}
            className="w-full py-4 px-6 bg-[#C44C55] text-white rounded-xl hover:bg-[#B2434C] transition-colors shadow-sm"
          >
            Salin Teks
          </button>
          {/* 
          <button
            onClick={handleExport}
            className="w-full py-4 px-6 bg-white text-[#8C3F48] border border-[#C44C55]/25 rounded-xl hover:bg-[#FFF6F7] transition-colors"
          >
            Ekspor PDF
          </button>
          <button
            onClick={handleSave}
            disabled={isBusy}
            className="w-full py-4 px-6 bg-white text-[#8C3F48] border border-[#C44C55]/25 rounded-xl hover:bg-[#FFF6F7] transition-colors"
          >
            Simpan Aman
          </button> 
          */}
        </div>
      </main>
    </div>
  );
}
