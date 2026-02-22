import { useNavigate } from "react-router";
import { TopNav } from "../components/top-nav";

export function Result() {
  const navigate = useNavigate();

  // Get assessment data from session storage
  const environment = sessionStorage.getItem("step1") || "workplace";
  const person = sessionStorage.getItem("step2") || "supervisor";

  const environmentLabel: Record<string, string> = {
    workplace: "Tempat kerja",
    campus: "Kampus",
    online: "Online",
    public: "Ruang publik",
  };

  const personRiskLevel =
    person === "supervisor" || person === "lecturer"
      ? "Tinggi"
      : person === "colleague" || person === "client"
      ? "Sedang"
      : "Rendah";

  const personRiskStyle =
    person === "supervisor" || person === "lecturer"
      ? "bg-[#C44C55]/15 text-[#A93C46]"
      : person === "colleague" || person === "client"
      ? "bg-[#DFA4AA]/20 text-[#944149]"
      : "bg-[#E8ECF3] text-[#596577]";

  const personRiskDescription =
    person === "supervisor" || person === "lecturer"
      ? "Terdeteksi ketimpangan kuasa yang signifikan."
      : person === "colleague" || person === "client"
      ? "Terdapat ketimpangan kuasa pada tingkat sedang."
      : "Ketimpangan kuasa relatif terbatas.";

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <TopNav showBack variant="light" />
      
      <main className="pt-20 pb-8 px-5 max-w-md mx-auto">
        <h2 className="text-2xl text-[#3A4556] mb-6 leading-snug">
          Analisis Terstruktur
        </h2>

        {/* Case Classification */}
        <div className="bg-white p-6 rounded-xl border border-[#E8ECF3] shadow-sm mb-4">
          <h3 className="text-sm text-[#596577] mb-2">Klasifikasi Kasus</h3>
          <p className="text-lg text-[#3A4556]">
            Pelecehan berbasis {environmentLabel[environment] || "Tempat kerja"}
          </p>
        </div>

        {/* Power Imbalance */}
        <div className="bg-white p-6 rounded-xl border border-[#E8ECF3] shadow-sm mb-4">
          <h3 className="text-sm text-[#596577] mb-3">Ketimpangan Kuasa</h3>
          <div className="flex items-center gap-3">
            <span
              className={`px-4 py-2 rounded-full text-sm ${personRiskStyle}`}
            >
              {personRiskLevel}
            </span>
            <p className="text-sm text-[#596577]">
              {personRiskDescription}
            </p>
          </div>
        </div>

        {/* Risk Level */}
        <div className="bg-white p-6 rounded-xl border border-[#E8ECF3] shadow-sm mb-4">
          <h3 className="text-sm text-[#596577] mb-3">Tingkat Risiko</h3>
          <div className="w-full h-2 bg-[#E8ECF3] rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-gradient-to-r from-[#F1B5BA] via-[#D98A93] to-[#C44C55]"
              style={{ width: "70%" }}
            />
          </div>
          <p className="text-sm text-[#596577]">
            Risiko sedang terhadap eskalasi atau pembalasan.
          </p>
        </div>

        {/* Recommended Paths */}
        <div className="bg-white p-6 rounded-xl border border-[#E8ECF3] shadow-sm mb-4">
          <h3 className="text-sm text-[#596577] mb-4">Rekomendasi Langkah</h3>
          <div className="space-y-3">
            <button className="w-full py-3 px-4 bg-[#FFF5F6] text-[#8C3F48] border border-[#F1D6D9] rounded-lg hover:bg-[#FFECEE] transition-colors text-left">
              Dokumentasikan terlebih dahulu
            </button>
            <button className="w-full py-3 px-4 bg-[#FFF5F6] text-[#8C3F48] border border-[#F1D6D9] rounded-lg hover:bg-[#FFECEE] transition-colors text-left">
              Pelaporan internal
            </button>
            <button className="w-full py-3 px-4 bg-[#FFF5F6] text-[#8C3F48] border border-[#F1D6D9] rounded-lg hover:bg-[#FFECEE] transition-colors text-left">
              Eskalasi eksternal
            </button>
            <button className="w-full py-3 px-4 bg-[#FFF5F6] text-[#8C3F48] border border-[#F1D6D9] rounded-lg hover:bg-[#FFECEE] transition-colors text-left">
              Cari dukungan pendamping
            </button>
          </div>
        </div>

        {/* Generate Report */}
        <button
          onClick={() => navigate("/report")}
          className="w-full py-4 px-6 bg-[#C44C55] text-white rounded-xl hover:bg-[#B2434C] transition-colors shadow-sm mb-4"
        >
          Buat Laporan Terstruktur
        </button>

        {/* Talk to AI */}
        <button
          onClick={() => navigate("/chat")}
          className="w-full py-4 px-6 bg-white text-[#8C3F48] border border-[#C44C55]/25 rounded-xl hover:bg-[#FFF6F7] transition-colors mb-8"
        >
          Diskusikan dengan SafeSpace AI
        </button>

        {/* Footer microcopy */}
        <p className="text-sm text-center text-[#596577] leading-relaxed">
          Anda tidak harus memutuskan semuanya hari ini.
        </p>
      </main>
    </div>
  );
}
