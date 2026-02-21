import { useEffect } from "react";
import { useNavigate } from "react-router";
import { ClarityLogo } from "../components/clarity-logo";

export function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col items-center justify-center px-6 animate-fade-in">
      <div className="flex flex-col items-center gap-6">
        <ClarityLogo size={64} />
        <p className="text-[#6B7684] text-center max-w-xs leading-relaxed">
          Structured guidance for difficult situations.
        </p>
      </div>
    </div>
  );
}
