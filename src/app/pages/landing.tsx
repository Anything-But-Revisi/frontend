import { useNavigate } from "react-router";
import { TopNav } from "../components/top-nav";
import { BottomNav } from "../components/bottom-nav";

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-20">
      <TopNav />
      
      <main className="pt-20 pb-8 px-5 max-w-md mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-10 mt-8">
          <h1 className="text-3xl text-[#3A4556] mb-4 leading-snug">
            Find SafePlace before you take action.
          </h1>
          <p className="text-lg text-[#6B7684] leading-relaxed">
            This space is private. You are in control.
          </p>
        </div>

        {/* Primary Actions */}
        <div className="space-y-3 mb-12">
          <button
            onClick={() => navigate("/assessment/step-1")}
            className="w-full py-4 px-6 bg-[#5C6F8F] text-white rounded-xl hover:bg-[#4A5A73] transition-colors shadow-sm"
          >
            Start Assessment
          </button>
          <button
            onClick={() => navigate("/chat")}
            className="w-full py-4 px-6 bg-white text-[#5C6F8F] border border-[#5C6F8F]/20 rounded-xl hover:bg-[#F7F9FC] transition-colors"
          >
            Talk to SafePlace AI
          </button>
        </div>

        {/* Explanation Cards */}
        <div className="space-y-3 mb-12">
          <div className="bg-white p-5 rounded-xl border border-[#E9EEF5]">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E9EEF5] flex items-center justify-center text-[#5C6F8F] text-sm font-medium">
                1
              </div>
              <div>
                <h3 className="text-[#3A4556] mb-1">Describe your situation</h3>
                <p className="text-sm text-[#6B7684] leading-relaxed">
                  Answer structured questions at your own pace
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E9EEF5]">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E9EEF5] flex items-center justify-center text-[#5C6F8F] text-sm font-medium">
                2
              </div>
              <div>
                <h3 className="text-[#3A4556] mb-1">Understand your risk</h3>
                <p className="text-sm text-[#6B7684] leading-relaxed">
                  Get neutral, structured analysis of your situation
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E9EEF5]">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E9EEF5] flex items-center justify-center text-[#5C6F8F] text-sm font-medium">
                3
              </div>
              <div>
                <h3 className="text-[#3A4556] mb-1">Choose your next step</h3>
                <p className="text-sm text-[#6B7684] leading-relaxed">
                  Explore options with clear, actionable guidance
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Reassurance */}
        <div className="bg-white p-6 rounded-xl border border-[#E9EEF5]">
          <h3 className="text-[#3A4556] mb-3">Privacy & Control</h3>
          <ul className="space-y-2 text-sm text-[#6B7684] leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-[#6BA8A9] mt-1">•</span>
              <span>We do not store personal data without consent</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6BA8A9] mt-1">•</span>
              <span>You may leave anytime</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6BA8A9] mt-1">���</span>
              <span>All information remains confidential</span>
            </li>
          </ul>
        </div>

        {/* Additional Links */}
        <div className="mt-8 text-center space-y-4">
          <button
            onClick={() => navigate("/insights")}
            className="text-sm text-[#6B7684] hover:text-[#5C6F8F] transition-colors"
          >
            View Anonymized Insights
          </button>
          <div className="flex justify-center gap-4 text-sm">
            <button
              onClick={() => navigate("/reports")}
              className="text-[#6B7684] hover:text-[#5C6F8F] transition-colors"
            >
              My Reports
            </button>
            <span className="text-[#E9EEF5]">|</span>
            <button
              onClick={() => navigate("/settings")}
              className="text-[#6B7684] hover:text-[#5C6F8F] transition-colors"
            >
              Settings
            </button>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}