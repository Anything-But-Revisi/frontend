import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import groupImg from "../../assets/Group 7.png";
import bgImg from "../../assets/Orang.png";

export function Splash() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"enter" | "visible" | "exit">("enter");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fade in logo
    const enterTimer = setTimeout(() => setPhase("visible"), 300);

    // Animate circular progress 0→100 over ~2.2s
    let start: number | null = null;
    let rafId: number;
    const duration = 2200;

    function animateProgress(ts: number) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        rafId = requestAnimationFrame(animateProgress);
      }
    }

    const progressTimer = setTimeout(() => {
      rafId = requestAnimationFrame(animateProgress);
    }, 400);

    // Start exit fade
    const exitTimer = setTimeout(() => setPhase("exit"), 2900);

    // Navigate after fade completes
    const navTimer = setTimeout(() => navigate("/landing"), 3500);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(progressTimer);
      clearTimeout(exitTimer);
      clearTimeout(navTimer);
      cancelAnimationFrame(rafId);
    };
  }, [navigate]);

  const isVisible = phase === "visible";
  const isExit = phase === "exit";
  const circumference = 2 * Math.PI * 15;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        transition: "opacity 0.6s ease",
        opacity: isExit ? 0 : 1,
      }}
    >
      {/* Background photo */}
      <img
        src={bgImg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ zIndex: 0 }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0,0,0,0.52)",
          zIndex: 1,
        }}
      />

      {/* Warm vignette bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 110%, rgba(30,0,0,0.5) 0%, transparent 65%)",
          zIndex: 2,
        }}
      />

      {/* Logo centered */}
      <div
        className="flex items-center justify-center relative"
        style={{
          zIndex: 10,
          transition: "opacity 1s cubic-bezier(0.22,1,0.36,1), transform 1s cubic-bezier(0.22,1,0.36,1)",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0px) scale(1)" : "translateY(10px) scale(0.92)",
        }}
      >
        <img
          src={groupImg}
          alt="SafeSpace Logo"
          style={{
            width: "180px",
            height: "180px",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Circular loading indicator */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          bottom: "68px",
          zIndex: 10,
          transition: "opacity 0.7s ease 0.6s",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <svg width="40" height="40" viewBox="0 0 36 36">
          {/* Track ring */}
          <circle
            cx="18"
            cy="18"
            r="15"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="2"
          />
          {/* Progress arc */}
          <circle
            cx="18"
            cy="18"
            r="15"
            fill="none"
            stroke="#E8636A"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress / 100)}
            transform="rotate(-90 18 18)"
            style={{ transition: "stroke-dashoffset 0.06s linear" }}
          />
        </svg>
      </div>
    </div>
  );
}