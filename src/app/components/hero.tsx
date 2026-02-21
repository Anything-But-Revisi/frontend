import { useNavigate } from "react-router";
import { useState } from "react";
import { TopNav } from "../components/top-nav";


export function Hero() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background room photo with dark overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 z-0" style={{ backgroundColor: "rgba(0,0,0,0.62)" }} />

      <TopNav />

      <section className="relative z-10 flex flex-col justify-end min-h-screen px-6 pb-16 pt-24">
        {/* Heading */}
        <div className="mb-5">
          <h1
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "clamp(2.5rem, 10vw, 3.8rem)",
              fontWeight: "700",
              color: "#E8636A",
              lineHeight: "1.2",
              margin: "0",
            }}
          >
            Understand.
          </h1>
          <h1
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "clamp(2.5rem, 10vw, 3.8rem)",
              fontWeight: "700",
              color: "#E8636A",
              lineHeight: "1.2",
              margin: "0",
            }}
          >
            Reflect.
          </h1>
          <h1
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "clamp(2.5rem, 10vw, 3.8rem)",
              fontWeight: "700",
              color: "#E8636A",
              lineHeight: "1.2",
              margin: "0",
            }}
          >
            Choose.
          </h1>
        </div>

        {/* Description text */}
        <p
          className="mb-8"
          style={{
            color: "rgba(255, 255, 255, 0.85)",
            fontSize: "14.5px",
            lineHeight: "1.75",
            maxWidth: "260px",
            margin: "0 0 32px 0",
          }}
        >
          Ruang ini membantu Anda memahami situasi dengan tenang.{" "}
          Luangkan waktu untuk merefleksikannya.{" "}
          Keputusan tetap sepenuhnya milik Anda.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3 w-full" style={{ maxWidth: "340px" }}>
          <button
            onClick={() => navigate("/assessment/step-1")}
            style={{
              backgroundColor: "#C44C55",
              color: "white",
              border: "none",
              borderRadius: "999px",
              padding: "16px 24px",
              fontSize: "16px",
              fontWeight: "500",
              cursor: "pointer",
              width: "100%",
              letterSpacing: "0.01em",
              transition: "opacity 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Mulai Pelaporan
          </button>

          <button
            onClick={() => navigate("/chat")}
            style={{
              backgroundColor: "rgba(217, 133, 133, 0.75)",
              color: "white",
              border: "none",
              borderRadius: "999px",
              padding: "16px 24px",
              fontSize: "16px",
              fontWeight: "500",
              cursor: "pointer",
              width: "100%",
              letterSpacing: "0.01em",
              transition: "opacity 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Bicara dengan SafeSpace AI
          </button>
        </div>
      </section>
    </div>
  );
}