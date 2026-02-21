export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-[#E6DFF0]/30">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C5D9E8] to-[#E6DFF0] flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 2C6.5 2 4 4.5 4 8C4 9.5 4.5 10.8 5.3 11.9L5 14L7.1 13.7C8.2 14.5 9.5 15 11 15C11 15 11 15 11 15C11 13.3 11.8 11.8 13 10.8C13 10.5 13 10.3 13 10C13 6.5 10.5 2 10 2Z"
                fill="#6B8DB8"
              />
              <path
                d="M15 12C13.3 12 12 13.3 12 15C12 15.5 12.2 16 12.4 16.4L12 18L13.6 17.6C14 17.9 14.5 18 15 18C16.7 18 18 16.7 18 15C18 13.3 16.7 12 15 12Z"
                fill="#D5C3E0"
              />
            </svg>
          </div>
          <span className="text-xl font-medium text-[#4A5568]">SafePlace</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#about"
            className="text-[#718096] hover:text-[#6B8DB8] transition-colors"
          >
            About
          </a>
          <a
            href="#privacy"
            className="text-[#718096] hover:text-[#6B8DB8] transition-colors"
          >
            Privacy
          </a>
          <a
            href="#resources"
            className="text-[#718096] hover:text-[#6B8DB8] transition-colors"
          >
            Resources
          </a>
          <button className="px-6 py-2.5 bg-[#6B8DB8] text-white rounded-full hover:bg-[#5A7BA3] transition-all shadow-sm hover:shadow-md">
            Start Now
          </button>
        </div>
        
        <button className="md:hidden p-2 text-[#718096]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </nav>
  );
}
