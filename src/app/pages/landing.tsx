import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import navbarImg from "../../assets/navbar.png"
import ruangImg from "../../assets/Ruang.png"
import orangImg from "../../assets/Orang.png"
import creditLogoImg from "../../assets/creditLogo.png"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../components/ui/carousel"
import type { CarouselApi } from "../components/ui/carousel"

export function Landing() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const [slide, setSlide] = useState(0)

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
  ]

  /* Navbar Scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* Sync Slide */
  useEffect(() => {
    if (!carouselApi) return
    const onSelect = () => setSlide(carouselApi.selectedScrollSnap())
    carouselApi.on("select", onSelect)
    return () => carouselApi.off("select", onSelect)
  }, [carouselApi])

  return (
    <div className="bg-[#F7F9FC] text-[#3A4556]">

      {/* ================= NAVBAR ================= */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 ${
          scrolled
            ? "bg-black/60 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <img src={navbarImg} alt="SafeSpace" className="h-8" />
      </nav>

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center justify-center">
        <img
          src={ruangImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-xl text-left px-6">
          <h1
            className="mb-6 text-4xl md:text-6xl font-bold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-[#FFD9C2] via-[#F3A0A8] to-[#D86A74]"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Understand.
            <br />
            Reflect.
            <br />
            Choose.
          </h1>

          <p className="text-white/80 mb-10 leading-relaxed">
            Ruang ini membantu Anda <br />
            memahami situasi dengan 
            <br />tenang.
            <br />Luangkan Waktu untuk
            <br />merefleksikannya.
            <br />Keputusan tetap 
            <br />sepenuhnya milik Anda.
          </p>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate("/assessment/step-1")}
              className="bg-[#C44C55] text-white py-4 rounded-full font-semibold shadow-lg hover:scale-[1.02] transition"
            >
              Mulai Pelaporan
            </button>

            <button
              onClick={() => navigate("/chat")}
              className="bg-white/20 backdrop-blur text-white py-4 rounded-full font-semibold hover:bg-white/30 transition"
            >
              Bicara dengan SafeSpace AI
            </button>
          </div>
        </div>
      </section>

      {/* ================= CARA KERJA ================= */}
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Cara Kerja SafeSpace
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Data pribadi Anda tidak akan disimpan tanpa izin.
            <br className="hidden md:block" />
            Anda bebas menghentikan proses kapan pun.
            <br className="hidden md:block" />
            Informasi Anda dijaga secara rahasia.
          </p>
        </div>

        {/* ================= CAROUSEL ================= */}
        <div className="max-w-2xl mx-auto">
          <Carousel
            setApi={setCarouselApi}
            opts={{ align: "start", loop: false }}
          >
            <CarouselContent className="-ml-4">
              {cards.map((card, i) => (
                <CarouselItem key={i} className="pl-4 basis-full">
                  <div className="h-[280px] md:h-[310px] flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
                    
                    <div className="h-[120px] md:h-[145px] w-full overflow-hidden">
                      <img
                        src={orangImg}
                        alt=""
                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                      />
                    </div>

                    <div className="flex flex-col flex-1 p-4 md:p-5">
                      <h3 className="text-base md:text-lg font-semibold mb-2">
                        {card.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed flex-1">
                        {card.desc}
                      </p>

                      <div className="mt-4 h-1 w-10 bg-[#C44C55] rounded-full" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="hidden md:flex left-4" />
            <CarouselNext className="hidden md:flex right-4" />
          </Carousel>

          {/* DOTS */}
          <div className="flex justify-center gap-2 mt-5">
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => carouselApi?.scrollTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  slide === i ? "w-6 bg-[#C44C55]" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t py-10 px-6">
        <div className="max-w-3xl mx-auto">
          <img src={creditLogoImg} alt="SafeSpace" className="h-8 mb-6" />

          <div className="space-y-3 text-sm">
            <a
              href="https://laporsapa129.kemenpppa.go.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-[#C44C55] transition"
            >
              Layanan SAPA 129
            </a>

            <a
              href="https://komnasperempuan.go.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-[#C44C55] transition"
            >
              Komnas Perempuan
            </a>
          </div>

          <p className="text-xs text-gray-400 mt-6">
            © 2026, Anything But Revisi. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
