import { TopNav } from "../components/top-nav";

export function Report() {
  const handleCopy = () => {
    const reportText = document.getElementById("report-content")?.innerText || "";
    navigator.clipboard.writeText(reportText);
    alert("Laporan berhasil disalin ke clipboard");
  };

  const handleExport = () => {
    alert("Fitur ekspor PDF akan tersedia pada versi berikutnya");
  };

  const handleSave = () => {
    alert("Laporan berhasil disimpan secara aman");
  };

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
          {/* Incident Summary */}
          <div>
            <h3 className="text-sm font-medium text-[#596577] mb-2">
              Ringkasan Kejadian
            </h3>
            <p className="text-[#3A4556] leading-relaxed">
              Pelecehan berbasis tempat kerja yang melibatkan atasan. Kejadian
              mencakup komentar tidak pantas dengan bukti yang tersedia melalui pesan.
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
              menciptakan kerentanan struktural dan meningkatkan risiko pembalasan.
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
                <span>Dokumentasikan seluruh kejadian beserta waktu kejadiannya</span>
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
                <span>Jelajahi pendampingan hukum eksternal bila diperlukan</span>
              </li>
            </ol>
          </div>

          {/* Report metadata */}
          <div className="pt-4 border-t border-[#E8ECF3]">
            <p className="text-xs text-[#596577]">Dibuat: 21 Februari 2026</p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleCopy}
            className="w-full py-4 px-6 bg-[#C44C55] text-white rounded-xl hover:bg-[#B2434C] transition-colors shadow-sm"
          >
            Salin Teks
          </button>
          <button
            onClick={handleExport}
            className="w-full py-4 px-6 bg-white text-[#8C3F48] border border-[#C44C55]/25 rounded-xl hover:bg-[#FFF6F7] transition-colors"
          >
            Ekspor PDF
          </button>
          <button
            onClick={handleSave}
            className="w-full py-4 px-6 bg-white text-[#8C3F48] border border-[#C44C55]/25 rounded-xl hover:bg-[#FFF6F7] transition-colors"
          >
            Simpan Aman
          </button>
        </div>
      </main>
    </div>
  );
}
