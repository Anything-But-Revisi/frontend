interface QuickExitProps {
  variant?: "dark" | "light";
  className?: string;
}

export function QuickExit({ variant = "light", className = "" }: QuickExitProps) {
  const handleQuickExit = () => {
    // Clear session data
    sessionStorage.clear();
    // Redirect to a neutral site
    window.location.replace("https://www.google.com");
  };

  const colorClass =
    variant === "dark"
      ? "text-white/85 hover:text-white hover:bg-white/10"
      : "text-[#6B7684] hover:text-[#3A4556]";

  return (
    <button
      onClick={handleQuickExit}
      className={`text-sm transition-colors px-3 py-1.5 rounded-lg ${colorClass} ${className}`.trim()}
    >
      Quick Exit
    </button>
  );
}
