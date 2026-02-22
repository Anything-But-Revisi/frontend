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
                  <div className="h-[300px] md:h-[340px] flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
                    
                    <div className="h-[180px] md:h-[215px] w-full overflow-hidden">
                      <img
                        src={orangImg}
                        alt=""
                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                      />
                    </div>

                    <div className="flex flex-col flex-1 p-3 md:p-4">
                      <h3 className="text-base md:text-lg font-semibold mb-2">
                        {card.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 flex-1">
                        {card.desc}
                      </p>

                      <div className="mt-3 h-1 w-10 bg-[#C44C55] rounded-full" />
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
      <footer className="relative overflow-hidden border-t border-[#E8ECF3] bg-gradient-to-b from-white to-[#F3F6FB] py-12 px-6">
        <div className="pointer-events-none absolute -top-16 -left-10 h-44 w-44 rounded-full bg-[#C44C55]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-8 h-44 w-44 rounded-full bg-[#DDAFB4]/20 blur-3xl" />

        <div className="relative max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
            <div className="max-w-sm">
              <img src={creditLogoImg} alt="SafeSpace" className="h-8 mb-4" />
              <p className="text-sm text-[#596577] leading-relaxed">
                Ruang aman untuk memahami situasi, menilai risiko, dan menentukan langkah berikutnya
                secara tenang serta terarah.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-[#3A4556] mb-3">Dukungan Resmi</p>
              <div className="space-y-3 text-sm">
                <a
                  href="https://laporsapa129.kemenpppa.go.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full border border-[#E8ECF3] bg-white px-4 py-2 text-[#596577] hover:text-[#C44C55] hover:border-[#C44C55]/30 transition"
                >
                  Layanan SAPA 129
                </a>

                <a
                  href="https://komnasperempuan.go.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full border border-[#E8ECF3] bg-white px-4 py-2 text-[#596577] hover:text-[#C44C55] hover:border-[#C44C55]/30 transition"
                >
                  Komnas Perempuan
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-[#E8ECF3] flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <p className="text-xs text-[#7B8796]">
              (c) 2026 Anything But Revisi. All rights reserved.
            </p>
            <p className="text-xs text-[#9AA4B2]">
              Privasi Anda tetap menjadi prioritas utama.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

