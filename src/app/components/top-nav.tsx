import { useNavigate } from "react-router";
import { ClarityLogo } from "./clarity-logo";
import { QuickExit } from "./quick-exit";

interface TopNavProps {
  showBack?: boolean;
  onBack?: () => void;
}

export function TopNav({ showBack, onBack }: TopNavProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-[#E9EEF5]">
      <div className="max-w-md mx-auto px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={handleBack}
              className="p-1.5 -ml-1.5 text-[#5C6F8F] hover:text-[#3A4556] transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
          <div className="flex items-center gap-2">
            <ClarityLogo size={24} />
            <span className="text-[#3A4556] font-medium">SafePlace</span>
          </div>
        </div>
        <QuickExit />
      </div>
    </nav>
  );
}
