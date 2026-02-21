import { useNavigate, useLocation } from "react-router";

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E9EEF5] z-40">
      <div className="max-w-md mx-auto px-5 py-3 flex items-center justify-around">
        <button
          onClick={() => navigate("/home")}
          className={`flex flex-col items-center gap-1 transition-colors ${
            isActive("/home") ? "text-[#5C6F8F]" : "text-[#6B7684]"
          }`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="text-xs">Home</span>
        </button>

        <button
          onClick={() => navigate("/reports")}
          className={`flex flex-col items-center gap-1 transition-colors ${
            isActive("/reports") ? "text-[#5C6F8F]" : "text-[#6B7684]"
          }`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <span className="text-xs">Reports</span>
        </button>

        <button
          onClick={() => navigate("/insights")}
          className={`flex flex-col items-center gap-1 transition-colors ${
            isActive("/insights") ? "text-[#5C6F8F]" : "text-[#6B7684]"
          }`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="20" x2="12" y2="10" />
            <line x1="18" y1="20" x2="18" y2="4" />
            <line x1="6" y1="20" x2="6" y2="16" />
          </svg>
          <span className="text-xs">Insights</span>
        </button>

        <button
          onClick={() => navigate("/settings")}
          className={`flex flex-col items-center gap-1 transition-colors ${
            isActive("/settings") ? "text-[#5C6F8F]" : "text-[#6B7684]"
          }`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v6m0 6v6m6-6h6m-6 0H1m16.24-4.76l4.24-4.24m-4.24 4.24L12 7.76M7.76 7.76L3.52 3.52m4.24 4.24L12 12m4.24 4.24l4.24 4.24m-4.24-4.24L12 12M7.76 16.24l-4.24 4.24m4.24-4.24L12 12" />
          </svg>
          <span className="text-xs">Settings</span>
        </button>
      </div>
    </nav>
  );
}
