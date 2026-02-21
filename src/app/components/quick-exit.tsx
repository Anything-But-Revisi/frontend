export function QuickExit() {
  const handleQuickExit = () => {
    // Clear session data
    sessionStorage.clear();
    // Redirect to a neutral site
    window.location.replace("https://www.google.com");
  };

  return (
    <button
      onClick={handleQuickExit}
      className="text-sm text-[#6B7684] hover:text-[#3A4556] transition-colors px-3 py-1.5"
    >
      Quick Exit
    </button>
  );
}
