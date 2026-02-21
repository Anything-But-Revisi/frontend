import { useState } from "react";
import { useNavigate } from "react-router";
import { TopNav } from "../../components/top-nav";
import { ProgressBar } from "../../components/progress-bar";

export function AssessmentStep4() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);

  const options = [
    { id: "messages", label: "Messages" },
    { id: "emails", label: "Emails" },
    { id: "witness", label: "Witness" },
    { id: "none", label: "None" },
  ];

  const handleContinue = () => {
    if (selected) {
      sessionStorage.setItem("step4", selected);
      navigate("/assessment/step-5");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <TopNav showBack />
      
      <div className="pt-16">
        <ProgressBar currentStep={4} totalSteps={5} />
      </div>

      <main className="pt-8 pb-8 px-5 max-w-md mx-auto">
        <h2 className="text-2xl text-[#3A4556] mb-2 leading-snug">
          Is there evidence?
        </h2>
        <p className="text-[#6B7684] mb-8 leading-relaxed">
          Select any documentation you may have
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
          Continue
        </button>
      </main>
    </div>
  );
}
