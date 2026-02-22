import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
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
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const isDark = variant === "dark";

  const handleMenuNavigate = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

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
          <div className="flex items-center">
            <ClarityLogo size={100} className="h-auto" />
          </div>
        </div>

        {/* Right: QuickExit + Hamburger */}
        <div className="flex items-center gap-1 md:gap-2">
          <div className="hidden md:block">
            <QuickExit variant={isDark ? "dark" : "light"} />
          </div>

          {/* Hamburger menu icon */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className={`md:hidden relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 active:scale-95 ${isDark ? "text-white hover:bg-white/15" : "text-[#3A4556] hover:bg-gray-100"}`}
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-top-nav-menu"
            type="button"
          >
            <span className="sr-only">{menuOpen ? "Tutup menu" : "Buka menu"}</span>
            <span className={`absolute block h-0.5 w-5 rounded-full transition-all duration-300 ${isDark ? "bg-white" : "bg-[#3A4556]"} ${menuOpen ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`absolute block h-0.5 w-5 rounded-full transition-all duration-300 ${isDark ? "bg-white" : "bg-[#3A4556]"} ${menuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute block h-0.5 w-5 rounded-full transition-all duration-300 ${isDark ? "bg-white" : "bg-[#3A4556]"} ${menuOpen ? "-rotate-45" : "translate-y-1.5"}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <>
          <button
            type="button"
            className="md:hidden fixed inset-0 top-[64px] bg-black/20"
            aria-label="Tutup menu"
            onClick={() => setMenuOpen(false)}
          />

          <div
            id="mobile-top-nav-menu"
            className={`md:hidden absolute top-full right-4 mt-2 w-[220px] rounded-2xl border p-2 shadow-xl backdrop-blur-sm ${isDark ? "bg-black/80 border-white/20" : "bg-white/95 border-gray-200"}`}
          >
            <button
              type="button"
              onClick={() => handleMenuNavigate("/landing")}
              className={`w-full rounded-xl px-4 py-2.5 text-left text-sm transition-colors ${isDark ? "text-white/90 hover:bg-white/15" : "text-[#3A4556] hover:bg-gray-100"}`}
            >
              Beranda
            </button>
            <button
              type="button"
              onClick={() => handleMenuNavigate("/assessment/step-1")}
              className={`w-full rounded-xl px-4 py-2.5 text-left text-sm transition-colors ${isDark ? "text-white/90 hover:bg-white/15" : "text-[#3A4556] hover:bg-gray-100"}`}
            >
              Mulai Pelaporan
            </button>
            <button
              type="button"
              onClick={() => handleMenuNavigate("/chat")}
              className={`w-full rounded-xl px-4 py-2.5 text-left text-sm transition-colors ${isDark ? "text-white/90 hover:bg-white/15" : "text-[#3A4556] hover:bg-gray-100"}`}
            >
              Chat AI
            </button>
            
            
            <div className={`my-2 border-t ${isDark ? "border-white/15" : "border-gray-200"}`} />
            <div className="px-1 py-1">
              <QuickExit variant={isDark ? "dark" : "light"} className="w-full text-left" />
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
