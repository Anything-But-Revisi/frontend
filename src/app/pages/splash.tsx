import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import groupImg from "../../assets/Group 7.png";

export function Splash() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"enter" | "visible" | "exit">("enter");

  useEffect(() => {
    // Phase 1: animate in
    const enterTimer = setTimeout(() => setPhase("visible"), 100);

    // Phase 2: start exit animation
    const exitTimer = setTimeout(() => setPhase("exit"), 1800);

    // Phase 3: navigate
    const navTimer = setTimeout(() => navigate("/home"), 2300);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden" style={{ background: "linear-gradient(160deg, #1a0a0b 0%, #2d1215 50%, #1a0a0b 100%)" }}>
      {/* Ambient glow blobs */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(196,76,85,0.25) 0%, transparent 70%)",
          transition: "opacity 0.8s ease",
          opacity: phase === "enter" ? 0 : phase === "visible" ? 1 : 0,
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(217,133,133,0.15) 0%, transparent 70%)",
          transition: "opacity 1.2s ease",
          opacity: phase === "enter" ? 0 : phase === "visible" ? 1 : 0,
        }}
      />

      {/* Subtle grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      {/* Main content */}
      <div
        className="flex flex-col items-center gap-8 relative z-10"
        style={{
          transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)",
          opacity: phase === "enter" ? 0 : phase === "visible" ? 1 : 0,
          transform: phase === "enter" ? "translateY(20px)" : phase === "visible" ? "translateY(0)" : "translateY(-12px)",
        }}
      >
        {/* Logo container with glow ring */}
        <div className="relative flex items-center justify-center">
          <div
            className="absolute w-28 h-28 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(196,76,85,0.3) 0%, transparent 70%)",
              filter: "blur(12px)",
            }}
          />
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center relative" style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <img src={groupImg} alt="SafeSpace" width={44} height={44} style={{ objectFit: "contain" }} />
          </div>
        </div>

        {/* Brand name */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-bold tracking-widest uppercase" style={{ color: "#E8737A", letterSpacing: "0.2em" }}>
            SafeSpace
          </h1>
          {/* Divider line */}
          <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, rgba(232,115,122,0.6), transparent)" }} />
          <p className="text-sm text-center tracking-wider" style={{ color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em" }}>
            Understand · Reflect · Choose
          </p>
        </div>
      </div>

      {/* Loading dots */}
      <div
        className="absolute bottom-16 flex gap-2"
        style={{
          transition: "opacity 0.7s ease 0.4s",
          opacity: phase === "visible" ? 1 : 0,
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: "#C44C55",
              animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
