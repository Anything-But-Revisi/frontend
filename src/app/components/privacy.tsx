export function Privacy() {
  return (
    <section id="privacy" className="py-20 px-6 bg-[#F7FAFC]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block p-4 bg-[#E6DFF0]/30 rounded-full mb-6">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 5L8 11V18C8 25.5 13 32.3 20 34C27 32.3 32 25.5 32 18V11L20 5Z"
                stroke="#6B8DB8"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M16 20L18.5 22.5L24 17"
                stroke="#6B8DB8"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 text-[#4A5568]">
            Your Privacy is Sacred
          </h2>
          <p className="text-xl text-[#718096] max-w-2xl mx-auto">
            We've built SafePlace with your safety and confidentiality at the core of everything we do.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <div className="w-14 h-14 bg-[#C5D9E8]/30 rounded-full flex items-center justify-center mb-6">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="5" y="11" width="14" height="10" rx="2" stroke="#6B8DB8" strokeWidth="2" fill="none"/>
                <path d="M7 11V7C7 4.79 8.79 3 11 3H13C15.21 3 17 4.79 17 7V11" stroke="#6B8DB8" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="text-2xl mb-3 text-[#4A5568]">Fully Anonymous</h3>
            <p className="text-[#718096] leading-relaxed">
              No names, emails, or personal information required. Your identity remains completely private.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <div className="w-14 h-14 bg-[#E6DFF0]/30 rounded-full flex items-center justify-center mb-6">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2L2 7V12C2 17.5 6 22.3 12 24C18 22.3 22 17.5 22 12V7L12 2Z" stroke="#6B8DB8" strokeWidth="2" fill="none"/>
                <path d="M12 8V12L14 14" stroke="#6B8DB8" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="text-2xl mb-3 text-[#4A5568]">End-to-End Encryption</h3>
            <p className="text-[#718096] leading-relaxed">
              All conversations are encrypted and secured. Only you can access your chat history.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <div className="w-14 h-14 bg-[#C5D9E8]/30 rounded-full flex items-center justify-center mb-6">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="3" stroke="#6B8DB8" strokeWidth="2" fill="none"/>
                <path d="M12 5V3M12 21V19M5 12H3M21 12H19M7.05 7.05L5.64 5.64M18.36 18.36L16.95 16.95M16.95 7.05L18.36 5.64M5.64 18.36L7.05 16.95" stroke="#6B8DB8" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="text-2xl mb-3 text-[#4A5568]">No Data Sharing</h3>
            <p className="text-[#718096] leading-relaxed">
              We never sell, share, or use your data for any purpose beyond supporting you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
