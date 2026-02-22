import { useState } from "react";
import { useNavigate } from "react-router";
import { TopNav } from "../../components/top-nav";
import { ProgressBar } from "../../components/progress-bar";

export function AssessmentStep5() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);

  const options = [
    { id: "risk", label: "Memahami tingkat risiko" },
    { id: "document", label: "Mendokumentasikan dengan aman" },
    { id: "reporting", label: "Mempertimbangkan pelaporan" },
    { id: "explore", label: "Menjelajahi opsi" },
  ];

  const handleContinue = () => {
    if (selected) {
      sessionStorage.setItem("step5", selected);
      navigate("/report");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <TopNav showBack variant="light" />
      
      <div className="pt-20 md:pt-22">
        <ProgressBar currentStep={5} totalSteps={5} />
      </div>

      <main className="pt-5 pb-8 px-5 max-w-md mx-auto">
        <h2 className="text-2xl text-[#3A4556] mb-2 leading-snug">
          Apa yang paling Anda butuhkan saat ini?
        </h2>
        <p className="text-[#6B7684] mb-8 leading-relaxed">
          Pilih yang terasa paling tepat untuk Anda saat ini
        </p>

        <div className="space-y-3 mb-8">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelected(option.id)}
              className={`w-full py-5 px-6 rounded-xl transition-all text-left ${
                selected === option.id
                  ? "bg-[#C44C55] text-white shadow-md"
                  : "bg-white text-[#3A4556] border border-[#E8ECF3] hover:border-[#C44C55]/30"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={!selected}
          className={`w-full py-4 px-6 rounded-xl transition-all ${
            selected
              ? "bg-[#C44C55] text-white hover:bg-[#B2434C] shadow-sm"
              : "bg-[#E8ECF3] text-[#8A94A3] cursor-not-allowed"
          }`}
        >
          Lihat Hasil
        </button>
      </main>
    </div>
  );
}
