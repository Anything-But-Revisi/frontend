import { useState } from "react";
import { useNavigate } from "react-router";
import { TopNav } from "../../components/top-nav";
import { ProgressBar } from "../../components/progress-bar";

export function AssessmentStep5() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);

  const options = [
    { id: "risk", label: "Understand the risk" },
    { id: "document", label: "Document safely" },
    { id: "reporting", label: "Consider reporting" },
    { id: "explore", label: "Explore options" },
  ];

  const handleContinue = () => {
    if (selected) {
      sessionStorage.setItem("step5", selected);
      navigate("/result");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <TopNav showBack />
      
      <div className="pt-16">
        <ProgressBar currentStep={5} totalSteps={5} />
      </div>

      <main className="pt-8 pb-8 px-5 max-w-md mx-auto">
        <h2 className="text-2xl text-[#3A4556] mb-2 leading-snug">
          What do you want right now?
        </h2>
        <p className="text-[#6B7684] mb-8 leading-relaxed">
          Choose what feels right for you at this moment
        </p>

        <div className="space-y-3 mb-8">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelected(option.id)}
              className={`w-full py-5 px-6 rounded-xl transition-all text-left ${
                selected === option.id
                  ? "bg-[#5C6F8F] text-white shadow-md"
                  : "bg-white text-[#3A4556] border border-[#E9EEF5] hover:border-[#5C6F8F]/30"
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
              ? "bg-[#6BA8A9] text-white hover:bg-[#5A9091] shadow-sm"
              : "bg-[#E9EEF5] text-[#6B7684] cursor-not-allowed"
          }`}
        >
          View Results
        </button>
      </main>
    </div>
  );
}
