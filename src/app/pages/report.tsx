import { TopNav } from "../components/top-nav";

export function Report() {
  const handleCopy = () => {
    const reportText = document.getElementById("report-content")?.innerText || "";
    navigator.clipboard.writeText(reportText);
    alert("Report copied to clipboard");
  };

  const handleExport = () => {
    alert("PDF export functionality would be implemented here");
  };

  const handleSave = () => {
    alert("Report saved securely");
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <TopNav showBack />
      
      <main className="pt-20 pb-8 px-5 max-w-md mx-auto">
        <h2 className="text-2xl text-[#3A4556] mb-6 leading-snug">
          Structured Report
        </h2>

        {/* Report Content */}
        <div
          id="report-content"
          className="bg-white p-6 rounded-xl border border-[#E9EEF5] mb-6 space-y-6"
        >
          {/* Incident Summary */}
          <div>
            <h3 className="text-sm font-medium text-[#6B7684] mb-2">
              Incident Summary
            </h3>
            <p className="text-[#3A4556] leading-relaxed">
              Workplace-based harassment involving supervisor. Incident includes
              inappropriate comments with evidence available via messages.
            </p>
          </div>

          {/* Timeline Structure */}
          <div>
            <h3 className="text-sm font-medium text-[#6B7684] mb-2">
              Timeline Structure
            </h3>
            <ul className="space-y-2 text-[#3A4556] leading-relaxed">
              <li className="flex gap-3">
                <span className="text-[#6B7684] flex-shrink-0">•</span>
                <span>Initial incident occurred in workplace environment</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#6B7684] flex-shrink-0">•</span>
                <span>Pattern identified over time</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#6B7684] flex-shrink-0">•</span>
                <span>Evidence collected and preserved</span>
              </li>
            </ul>
          </div>

          {/* Risk Assessment */}
          <div>
            <h3 className="text-sm font-medium text-[#6B7684] mb-2">
              Risk Assessment
            </h3>
            <p className="text-[#3A4556] leading-relaxed mb-3">
              Moderate risk level identified based on:
            </p>
            <ul className="space-y-2 text-[#3A4556] leading-relaxed">
              <li className="flex gap-3">
                <span className="text-[#6B7684] flex-shrink-0">•</span>
                <span>Power differential present</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#6B7684] flex-shrink-0">•</span>
                <span>Documented evidence available</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#6B7684] flex-shrink-0">•</span>
                <span>Potential for workplace retaliation</span>
              </li>
            </ul>
          </div>

          {/* Power Imbalance Context */}
          <div>
            <h3 className="text-sm font-medium text-[#6B7684] mb-2">
              Power Imbalance Context
            </h3>
            <p className="text-[#3A4556] leading-relaxed">
              High power differential detected. Supervisor-employee relationship
              creates structural vulnerability and increased risk of retaliation.
            </p>
          </div>

          {/* Suggested Escalation Path */}
          <div>
            <h3 className="text-sm font-medium text-[#6B7684] mb-2">
              Suggested Escalation Path
            </h3>
            <ol className="space-y-2 text-[#3A4556] leading-relaxed">
              <li className="flex gap-3">
                <span className="text-[#6B7684] flex-shrink-0">1.</span>
                <span>Document all incidents with timestamps</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#6B7684] flex-shrink-0">2.</span>
                <span>Preserve all evidence securely</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#6B7684] flex-shrink-0">3.</span>
                <span>Consider internal HR reporting</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#6B7684] flex-shrink-0">4.</span>
                <span>Explore external legal counsel if needed</span>
              </li>
            </ol>
          </div>

          {/* Report metadata */}
          <div className="pt-4 border-t border-[#E9EEF5]">
            <p className="text-xs text-[#6B7684]">
              Generated: February 21, 2026
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleCopy}
            className="w-full py-4 px-6 bg-[#5C6F8F] text-white rounded-xl hover:bg-[#4A5A73] transition-colors shadow-sm"
          >
            Copy Text
          </button>
          {/* <button
            onClick={handleExport}
            className="w-full py-4 px-6 bg-white text-[#5C6F8F] border border-[#5C6F8F]/20 rounded-xl hover:bg-[#F7F9FC] transition-colors"
          >
            Export PDF
          </button> */}
          {/* <button
            onClick={handleSave}
            className="w-full py-4 px-6 bg-white text-[#6BA8A9] border border-[#6BA8A9]/20 rounded-xl hover:bg-[#F7F9FC] transition-colors"
          >
            Save Securely
          </button> */}
        </div>
      </main>
    </div>
  );
}
