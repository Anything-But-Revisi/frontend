import { useNavigate } from "react-router";
import { ClarityLogo } from "./clarity-logo";
import { QuickExit } from "./quick-exit";

interface TopNavProps {
  showBack?: boolean;
  onBack?: () => void;
  /** "dark" = dipakai di atas background gelap (hero), "light" = dipakai di halaman putih */
  variant?: "dark" | "light";
}

export function TopNav({ showBack, onBack, variant = "dark" }: TopNavProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const isDark = variant === "dark";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isDark ? "bg-gradient-to-b from-black/40 to-transparent" : "bg-white/98 backdrop-blur-md border-b border-gray-200 shadow-md"}`}>
      <div className="w-full px-4 md:px-6 lg:px-8 py-3 md:py-4 flex items-center justify-between h-full max-w-full md:max-w-none lg:max-w-7xl lg:mx-auto">
        {/* Left: Back + Logo */}
        <div className="flex items-center gap-2 md:gap-3 flex-1">
          {showBack && (
            <button
              onClick={handleBack}
              className={`p-2 -ml-2 rounded-full transition-all duration-200 active:scale-95 ${isDark ? "text-white/90 hover:text-white hover:bg-white/15" : "text-[#5C6F8F] hover:text-[#3A4556] hover:bg-gray-100"}`}
              aria-label="Kembali"
            >
              <svg width="20" height="20" className="md:w-6 md:h-6" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          {/* Logo + Brand */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className={`p-1.5 md:p-2 rounded-full transition-all duration-200 ${isDark ? "bg-white/15 backdrop-blur-sm hover:bg-white/20" : "bg-gradient-to-br from-[#FDF0F0] to-[#FCE5E5] hover:shadow-md"}`}>
              <ClarityLogo size={20} className="md:w-6 md:h-6" />
            </div>
            <span className={`font-bold text-base md:text-lg tracking-tight ${isDark ? "text-white drop-shadow-lg" : "text-[#C44C55]"}`}>SafeSpace</span>
          </div>
        </div>

        {/* Right: QuickExit + Hamburger */}
        <div className="flex items-center gap-1 md:gap-2">
          <QuickExit />

          {/* Hamburger menu icon */}
          <button className={`flex flex-col gap-1 md:gap-1.5 p-2 md:p-2.5 rounded-full transition-all duration-200 active:scale-95 ${isDark ? "text-white hover:bg-white/15" : "text-[#3A4556] hover:bg-gray-100"}`} aria-label="Menu">
            <span className={`block w-5 md:w-6 h-0.5 rounded-full transition-all ${isDark ? "bg-white" : "bg-[#3A4556]"}`} />
            <span className={`block w-5 md:w-6 h-0.5 rounded-full transition-all ${isDark ? "bg-white" : "bg-[#3A4556]"}`} />
            <span className={`block w-4 md:w-5 h-0.5 rounded-full transition-all ${isDark ? "bg-white" : "bg-[#3A4556]"}`} />
          </button>
        </div>
      </div>
    </nav>
  );
}
