export function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Gentle background shapes */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-[#E6DFF0] rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#C5D9E8] rounded-full opacity-20 blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Abstract supportive illustration */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Gentle overlapping circles representing support and connection */}
              <circle cx="45" cy="60" r="35" fill="#E6DFF0" opacity="0.6" />
              <circle cx="75" cy="60" r="35" fill="#C5D9E8" opacity="0.6" />
              <circle cx="60" cy="45" r="30" fill="#6B8DB8" opacity="0.4" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl mb-6 text-[#4A5568] leading-tight">
          You Are Not Alone.
        </h1>
        
        <p className="text-xl md:text-2xl text-[#718096] mb-8 leading-relaxed max-w-2xl mx-auto">
          A safe, private, and confidential space where you can find support, healing, and understanding.
        </p>
        
        <p className="text-lg text-[#718096] mb-10 max-w-xl mx-auto">
          SafePlace offers AI-powered support designed with care, compassion, and complete anonymity.
        </p>
        
        <button className="px-10 py-4 bg-[#6B8DB8] text-white text-lg rounded-full hover:bg-[#5A7BA3] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
          Start Anonymous Chat
        </button>
        
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-[#718096]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 1C4.5 1 2 3.5 2 7C2 8 2.3 8.9 2.8 9.7L2 12L4.3 11.2C5.1 11.7 6 12 7 12H7.1C7 11.7 7 11.3 7 11C7 8.2 9.2 6 12 6C12.3 6 12.7 6 13 6.1C12.4 3.3 10.4 1 8 1Z"
              fill="#6B8DB8"
            />
            <path
              d="M12 7C10.3 7 9 8.3 9 10C9 10.4 9.1 10.8 9.3 11.1L8.5 13L10.4 12.2C10.8 12.4 11.4 12.5 12 12.5C13.7 12.5 15 11.2 15 9.5C15 7.8 13.7 7 12 7Z"
              fill="#D5C3E0"
            />
          </svg>
          <span>100% anonymous • No registration required</span>
        </div>
      </div>
    </section>
  );
}
