import { useNavigate } from "react-router";
import { TopNav } from "../components/top-nav";

export function Result() {
  const navigate = useNavigate();

  // Get assessment data from session storage
  const environment = sessionStorage.getItem("step1") || "workplace";
  const person = sessionStorage.getItem("step2") || "supervisor";

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <TopNav showBack />
      
      <main className="pt-20 pb-8 px-5 max-w-md mx-auto">
        <h2 className="text-2xl text-[#3A4556] mb-6 leading-snug">
          Structured Analysis
        </h2>

        {/* Case Classification */}
        <div className="bg-white p-6 rounded-xl border border-[#E9EEF5] mb-4">
          <h3 className="text-sm text-[#6B7684] mb-2">Case Classification</h3>
          <p className="text-lg text-[#3A4556]">
            {environment.charAt(0).toUpperCase() + environment.slice(1)}-based harassment
          </p>
        </div>

        {/* Power Imbalance */}
        <div className="bg-white p-6 rounded-xl border border-[#E9EEF5] mb-4">
          <h3 className="text-sm text-[#6B7684] mb-3">Power Imbalance</h3>
          <div className="flex items-center gap-3">
            <span
              className={`px-4 py-2 rounded-full text-sm ${
                person === "supervisor" || person === "lecturer"
                  ? "bg-[#C97B7B]/20 text-[#C97B7B]"
                  : person === "colleague" || person === "client"
                  ? "bg-[#D8A657]/20 text-[#D8A657]"
                  : "bg-[#7FAF8E]/20 text-[#7FAF8E]"
              }`}
            >
              {person === "supervisor" || person === "lecturer"
                ? "High"
                : person === "colleague" || person === "client"
                ? "Medium"
                : "Low"}
            </span>
            <p className="text-sm text-[#6B7684]">
              {person === "supervisor" || person === "lecturer"
                ? "Significant power differential detected"
                : person === "colleague" || person === "client"
                ? "Moderate power differential"
                : "Limited power differential"}
            </p>
          </div>
        </div>

        {/* Risk Level */}
        <div className="bg-white p-6 rounded-xl border border-[#E9EEF5] mb-4">
          <h3 className="text-sm text-[#6B7684] mb-3">Risk Level</h3>
          <div className="w-full h-2 bg-[#E9EEF5] rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-gradient-to-r from-[#7FAF8E] via-[#D8A657] to-[#C97B7B]"
              style={{ width: "70%" }}
            />
          </div>
          <p className="text-sm text-[#6B7684]">
            Moderate risk of escalation or retaliation
          </p>
        </div>

        {/* Recommended Paths */}
        <div className="bg-white p-6 rounded-xl border border-[#E9EEF5] mb-4">
          <h3 className="text-sm text-[#6B7684] mb-4">Recommended Paths</h3>
          <div className="space-y-3">
            <button className="w-full py-3 px-4 bg-[#E9EEF5] text-[#3A4556] rounded-lg hover:bg-[#DDE3EC] transition-colors text-left">
              Document First
            </button>
            <button className="w-full py-3 px-4 bg-[#E9EEF5] text-[#3A4556] rounded-lg hover:bg-[#DDE3EC] transition-colors text-left">
              Internal Reporting
            </button>
            <button className="w-full py-3 px-4 bg-[#E9EEF5] text-[#3A4556] rounded-lg hover:bg-[#DDE3EC] transition-colors text-left">
              External Escalation
            </button>
            <button className="w-full py-3 px-4 bg-[#E9EEF5] text-[#3A4556] rounded-lg hover:bg-[#DDE3EC] transition-colors text-left">
              Seek Advisory Support
            </button>
          </div>
        </div>

        {/* Generate Report */}
        <button
          onClick={() => navigate("/report")}
          className="w-full py-4 px-6 bg-[#5C6F8F] text-white rounded-xl hover:bg-[#4A5A73] transition-colors shadow-sm mb-4"
        >
          Generate Structured Report
        </button>

        {/* Talk to AI */}
        <button
          onClick={() => navigate("/chat")}
          className="w-full py-4 px-6 bg-white text-[#5C6F8F] border border-[#5C6F8F]/20 rounded-xl hover:bg-[#F7F9FC] transition-colors mb-8"
        >
          Discuss with Clarity AI
        </button>

        {/* Footer microcopy */}
        <p className="text-sm text-center text-[#6B7684] leading-relaxed">
          You do not need to decide everything today.
        </p>
      </main>
    </div>
  );
}
