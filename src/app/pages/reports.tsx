import { useNavigate } from "react-router";
import { TopNav } from "../components/top-nav";

interface SavedReport {
  id: string;
  date: string;
  environment: string;
  riskLevel: "Low" | "Medium" | "High";
  status: "Draft" | "Completed";
}

export function Reports() {
  const navigate = useNavigate();

  const reports: SavedReport[] = [
    {
      id: "1",
      date: "Feb 21, 2026",
      environment: "Workplace",
      riskLevel: "Medium",
      status: "Completed",
    },
    {
      id: "2",
      date: "Feb 18, 2026",
      environment: "Campus",
      riskLevel: "High",
      status: "Draft",
    },
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case "High":
        return "bg-[#C97B7B]/20 text-[#C97B7B]";
      case "Medium":
        return "bg-[#D8A657]/20 text-[#D8A657]";
      case "Low":
        return "bg-[#7FAF8E]/20 text-[#7FAF8E]";
      default:
        return "bg-[#E9EEF5] text-[#6B7684]";
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <TopNav showBack />
      
      <main className="pt-20 pb-8 px-5 max-w-md mx-auto">
        <h2 className="text-2xl text-[#3A4556] mb-6 leading-snug">
          My Reports
        </h2>

        {reports.length === 0 ? (
          <div className="bg-white p-8 rounded-xl border border-[#E9EEF5] text-center">
            <p className="text-[#6B7684] mb-4">No saved reports yet</p>
            <button
              onClick={() => navigate("/home")}
              className="text-[#5C6F8F] hover:underline"
            >
              Start an assessment
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {reports.map((report) => (
              <button
                key={report.id}
                onClick={() => navigate("/report")}
                className="w-full bg-white p-5 rounded-xl border border-[#E9EEF5] hover:border-[#5C6F8F]/30 transition-colors text-left"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-[#3A4556] font-medium mb-1">
                      {report.environment} Assessment
                    </p>
                    <p className="text-sm text-[#6B7684]">{report.date}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${getRiskColor(
                      report.riskLevel
                    )}`}
                  >
                    {report.riskLevel}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      report.status === "Completed"
                        ? "bg-[#E9EEF5] text-[#6B7684]"
                        : "bg-[#6BA8A9]/20 text-[#6BA8A9]"
                    }`}
                  >
                    {report.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
