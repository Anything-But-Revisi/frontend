import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import navbarImg from "../../assets/navbar.png";
import ruangImg from "../../assets/Ruang.png";
import orangImg from "../../assets/Orang.png";
import creditLogoImg from "../../assets/creditLogo.png";

/* ─── Scroll-fade hook ─────────────────────────────────────────── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function FadeSection({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
      }}
    >
      {children}
    </div>
  );
}

const FONT_LINK =
  "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap";

export function Landing() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  /* Navbar scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Carousel */
  const [slide, setSlide] = useState(0);
  const totalSlides = 3;
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % totalSlides), 3500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollTo({ left: slide * el.offsetWidth, behavior: "smooth" });
  }, [slide]);

  const handleCarouselScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    setSlide(Math.round(el.scrollLeft / el.offsetWidth));
  };

  const cards = [
    {
      title: "Ceritakan situasi Anda",
      desc: "Jawab pertanyaan terstruktur sesuai kenyamanan Anda.",
    },
    {
      title: "Pahami tingkat risiko Anda",
      desc: "Dapatkan analisis situasi yang netral dan terstruktur.",
    },
    {
      title: "Pilih langkah berikutnya",
      desc: "Jelajahi opsi dengan panduan yang jelas dan dapat diambil tindakan.",
    },
  ];

  return (
    <>
      <link rel="stylesheet" href={FONT_LINK} />

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Montserrat', sans-serif; background: #F7F9FC; }

        /* ── Navbar ── */
        .ss-navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 22px;
          background: transparent;
          transition: background 0.4s ease, box-shadow 0.4s ease;
        }
        .ss-navbar.scrolled {
          background: rgba(12,6,6,0.70);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 1px 0 rgba(255,255,255,0.05);
        }
        .ss-navbar img { height: 34px; object-fit: contain; display: block; }
        .ss-hamburger {
          display: flex; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 5px;
        }
        .ss-hamburger span {
          display: block; width: 22px; height: 2px;
          background: #fff; border-radius: 2px;
        }

        /* ── Hero ── */
        .ss-hero {
          position: relative; width: 100%; min-height: 100svh;
          display: flex; flex-direction: column;
          justify-content: center; align-items: center;
          overflow: hidden;
        }
        .ss-hero-bg {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center; display: block;
        }
        .ss-hero-overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.52);
        }
        .ss-hero-content {
          position: relative; z-index: 2;
          width: 100%; max-width: 480px;
          padding: 96px 28px 56px;
          display: flex; flex-direction: column; align-items: flex-start;
        }
        .ss-hero-heading {
          font-family: 'Montserrat', sans-serif; font-weight: 700;
          font-size: clamp(2.6rem, 10vw, 4.2rem);
          line-height: 1.12;
          background: linear-gradient(45deg, #D98585 0%, #C44C55 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px; width: 100%;
        }
        .ss-hero-body {
          font-family: 'Montserrat', sans-serif; font-weight: 500;
          font-size: clamp(0.82rem, 3.2vw, 0.92rem);
          line-height: 1.9; color: rgba(247,249,252,0.85);
          margin-bottom: 48px; width: 100%;
        }
        .ss-hero-buttons {
          display: flex; flex-direction: column; gap: 12px; width: 100%;
        }
        .ss-btn-primary {
          font-family: 'Montserrat', sans-serif; font-weight: 600; font-size: 15px;
          padding: 16px 24px; border-radius: 50px; border: none; cursor: pointer;
          text-align: center; width: 100%;
          background: #C44C55; color: #F7F9FC;
          box-shadow: 0 4px 20px rgba(196,76,85,0.38);
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .ss-btn-primary:hover { background: #b33f48; transform: translateY(-1px); box-shadow: 0 6px 24px rgba(196,76,85,0.5); }
        .ss-btn-secondary {
          font-family: 'Montserrat', sans-serif; font-weight: 600; font-size: 15px;
          padding: 16px 24px; border-radius: 50px; border: none; cursor: pointer;
          text-align: center; width: 100%;
          background: rgba(217,133,133,0.75); color: #F7F9FC;
          box-shadow: 0 4px 16px rgba(217,133,133,0.28);
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .ss-btn-secondary:hover { background: rgba(217,133,133,0.95); transform: translateY(-1px); }

        /* ── Section ── */
        .ss-section-wrap { background: #F7F9FC; }
        .ss-section { padding: 72px 24px 60px; max-width: 720px; margin: 0 auto; }
        .ss-section-title {
          font-family: 'Montserrat', sans-serif; font-weight: 700;
          font-size: clamp(1.35rem, 5vw, 1.9rem); color: #3A4556;
          margin-bottom: 12px; text-align: center;
        }
        .ss-section-subtitle {
          font-family: 'Montserrat', sans-serif; font-weight: 400;
          font-size: clamp(0.8rem, 2.5vw, 0.92rem); color: #6B7684;
          text-align: center; line-height: 1.8; margin-bottom: 40px;
        }

        /* ── Carousel ── */
        .ss-carousel-wrap { position: relative; }
        .ss-carousel-track {
          display: flex; overflow-x: scroll; scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch; scrollbar-width: none; gap: 14px;
        }
        .ss-carousel-track::-webkit-scrollbar { display: none; }
        .ss-carousel-card {
          flex: 0 0 82%; scroll-snap-align: start;
          background: #fff; border-radius: 16px; overflow: hidden;
          box-shadow: 0 2px 18px rgba(58,69,86,0.09);
          transition: transform 0.3s;
        }
        .ss-carousel-card:hover { transform: translateY(-3px); }
        .ss-card-img { width: 100%; height: 175px; object-fit: cover; object-position: center top; display: block; }
        .ss-card-body { padding: 18px 20px 22px; }
        .ss-card-title {
          font-family: 'Montserrat', sans-serif; font-weight: 600;
          font-size: 14.5px; color: #3A4556; margin-bottom: 6px;
        }
        .ss-card-desc {
          font-family: 'Montserrat', sans-serif; font-weight: 400;
          font-size: 13px; color: #3A4556; line-height: 1.65;
        }
        .ss-carousel-dots { display: flex; justify-content: center; gap: 6px; margin-top: 20px; }
        .ss-dot {
          height: 8px; width: 8px; border-radius: 999px; background: #D9D9D9;
          border: none; cursor: pointer; padding: 0;
          transition: width 0.35s ease, background 0.35s ease;
        }
        .ss-dot.active { width: 22px; background: #C44C55; }

        /* ── Footer ── */
        .ss-footer {
          background: #fff; padding: 28px 24px 24px;
          border-top: 1px solid rgba(58,69,86,0.07);
        }
        .ss-footer-logo { height: 34px; object-fit: contain; margin-bottom: 16px; display: block; }
        .ss-footer-link {
          display: block; font-family: 'Montserrat', sans-serif; font-weight: 500;
          font-size: 13px; color: #3A4556; text-decoration: none;
          margin-bottom: 8px; transition: color 0.2s;
        }
        .ss-footer-link:hover { color: #C44C55; }
        .ss-footer-copy {
          font-family: 'Montserrat', sans-serif; font-weight: 400;
          font-size: 11px; color: #9AA3AE; margin-top: 20px;
        }

        /* ── Responsive ── */
        @media (min-width: 640px) {
          .ss-hero-content { padding: 110px 48px 72px; max-width: 600px; }
          .ss-carousel-card { flex: 0 0 44%; }
        }
        @media (min-width: 1024px) {
          .ss-hero-content { padding: 120px 0 80px; max-width: 560px; }
          .ss-hero-heading { font-size: 4.8rem; }
          .ss-carousel-card { flex: 0 0 29%; }
          .ss-section { padding: 88px 40px 72px; }
        }
      `}</style>

      {/* ── Fixed Navbar ── */}
      <nav className={`ss-navbar${scrolled ? " scrolled" : ""}`}>
        <img src={navbarImg} alt="SafeSpace" />
        <button className="ss-hamburger" aria-label="Menu">
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* ── Hero ── */}
      <section className="ss-hero">
        <img src={ruangImg} alt="" className="ss-hero-bg" />
        <div className="ss-hero-overlay" />
        <div className="ss-hero-content">
          <h1 className="ss-hero-heading">
            Understand.
            <br />
            Reflect.
            <br />
            Choose.
          </h1>
          <p className="ss-hero-body">
            Ruang ini membantu Anda memahami situasi dengan tenang. Luangkan
            waktu untuk merefleksikannya. Keputusan tetap sepenuhnya milik Anda.
          </p>
          <div className="ss-hero-buttons">
            <button
              className="ss-btn-primary"
              onClick={() => navigate("/assessment/step-1")}
            >
              Mulai Pelaporan
            </button>
            <button
              className="ss-btn-secondary"
              onClick={() => navigate("/chat")}
            >
              Bicara dengan SafeSpace AI
            </button>
          </div>
        </div>
      </section>

      {/* ── Cara Kerja ── */}
      <div className="ss-section-wrap">
        <div className="ss-section">
          <FadeSection>
            <h2 className="ss-section-title">Cara Kerja SafeSpace</h2>
            <p className="ss-section-subtitle">
              Data pribadi Anda tidak akan disimpan tanpa izin.
              <br />
              Anda bebas menghentikan proses kapan pun.
              <br />
              Informasi Anda dijaga secara rahasia.
            </p>
          </FadeSection>

          <FadeSection delay={120} className="ss-carousel-wrap">
            <div
              className="ss-carousel-track"
              ref={carouselRef}
              onScroll={handleCarouselScroll}
            >
              {cards.map((card, i) => (
                <div className="ss-carousel-card" key={i}>
                  <img src={orangImg} alt="" className="ss-card-img" />
                  <div className="ss-card-body">
                    <p className="ss-card-title">{card.title}</p>
                    <p className="ss-card-desc">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="ss-carousel-dots">
              {cards.map((_, i) => (
                <button
                  key={i}
                  className={`ss-dot${slide === i ? " active" : ""}`}
                  onClick={() => setSlide(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </FadeSection>
        </div>
      </div>

      {/* ── Footer ── */}
      <FadeSection>
        <footer className="ss-footer">
          <img src={creditLogoImg} alt="SafeSpace" className="ss-footer-logo" />
          <a
            href="https://laporsapa129.kemenpppa.go.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="ss-footer-link"
          >
            Layanan SAPA 129
          </a>
          <a
            href="https://komnasperempuan.go.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="ss-footer-link"
          >
            Komnas Perempuan
          </a>
          <p className="ss-footer-copy">
            © 2026, Anything But Revisi. All rights reserved.
          </p>
        </footer>
      </FadeSection>
    </>
  );
}
