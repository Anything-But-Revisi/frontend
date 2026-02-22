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
    if (!reportText) {
      return;
    }

    navigator.clipboard.writeText(reportText);
    alert("Report copied to clipboard");
  }, [reportText]);

  const isBusy = isLoading || isGenerating;

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <TopNav showBack />

      <main className="pt-20 pb-8 px-5 max-w-md mx-auto">
        <h2 className="text-2xl text-[#3A4556] mb-6 leading-snug">
          Structured Report
        </h2>

        <div className="bg-white p-6 rounded-xl border border-[#E9EEF5] mb-6 space-y-6">
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
            <>
              <div>
                <h3 className="text-sm font-medium text-[#6B7684] mb-2">
                  Incident Summary
                </h3>
                <p className="text-[#3A4556] leading-relaxed whitespace-pre-line">
                  {reportText}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E9EEF5]">
                <p className="text-xs text-[#6B7684]">
                  Generated: {formatDate(report.created_at)}
                </p>
              </div>
            </>
          ) : null}
        </div>

        <div className="space-y-3">
          <button
            onClick={handleCopy}
            disabled={!report || isBusy}
            className="w-full py-4 px-6 bg-[#5C6F8F] text-white rounded-xl hover:bg-[#4A5A73] transition-colors shadow-sm disabled:opacity-50"
          >
            Copy Text
          </button>
          <button
            onClick={() => {
              void loadOrCreateReport();
            }}
            disabled={isBusy}
            className="w-full py-4 px-6 bg-white text-[#5C6F8F] border border-[#5C6F8F]/20 rounded-xl hover:bg-[#F7F9FC] transition-colors disabled:opacity-50"
          >
            Muat Ulang Report
          </button>
        </div>
      </main>
    </div>
  );
}
