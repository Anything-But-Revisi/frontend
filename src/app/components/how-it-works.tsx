export function HowItWorks() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-[#4A5568]">
            How It Works
          </h2>
          <p className="text-xl text-[#718096] max-w-2xl mx-auto">
            Getting support is simple, safe, and completely on your terms.
          </p>
        </div>
        
        <div className="space-y-12">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-[#C5D9E8] to-[#E6DFF0] rounded-full flex items-center justify-center">
                <span className="text-2xl font-medium text-[#4A5568]">1</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl mb-3 text-[#4A5568]">Start a Conversation</h3>
              <p className="text-lg text-[#718096] leading-relaxed mb-4">
                Click "Start Anonymous Chat" to begin. No login, no email, no personal details needed. Just you and a supportive space.
              </p>
              <div className="bg-[#F7FAFC] p-6 rounded-2xl inline-flex items-center gap-4">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 4C10 4 6 8 6 13C6 15 6.8 16.8 8 18.3L7 22L10.6 21C12.1 22 14 23 16.5 23C16.5 23 16.5 23 16.5 23C16.5 20.3 18 18 20 16.5C20 16 20 15.5 20 15C20 10 18 4 16 4Z"
                    fill="#C5D9E8"
                  />
                </svg>
                <span className="text-[#4A5568]">Instant access, no barriers</span>
              </div>
            </div>
          </div>
          
          {/* Connector line */}
          <div className="md:ml-8 ml-7 w-0.5 h-12 bg-gradient-to-b from-[#E6DFF0] to-[#C5D9E8]"></div>
          
          {/* Step 2 */}
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-[#E6DFF0] to-[#C5D9E8] rounded-full flex items-center justify-center">
                <span className="text-2xl font-medium text-[#4A5568]">2</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl mb-3 text-[#4A5568]">Share at Your Own Pace</h3>
              <p className="text-lg text-[#718096] leading-relaxed mb-4">
                Express yourself freely in a judgment-free environment. Our AI is designed to listen with empathy and respond with care and understanding.
              </p>
              <div className="bg-[#F7FAFC] p-6 rounded-2xl inline-flex items-center gap-4">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 6C13.8 6 12 7.8 12 10C12 12.2 13.8 14 16 14C18.2 14 20 12.2 20 10C20 7.8 18.2 6 16 6Z"
                    fill="#E6DFF0"
                  />
                  <path
                    d="M16 16C12.1 16 9 19.1 9 23V26H23V23C23 19.1 19.9 16 16 16Z"
                    fill="#C5D9E8"
                  />
                </svg>
                <span className="text-[#4A5568]">Compassionate AI support</span>
              </div>
            </div>
          </div>
          
          {/* Connector line */}
          <div className="md:ml-8 ml-7 w-0.5 h-12 bg-gradient-to-b from-[#C5D9E8] to-[#E6DFF0]"></div>
          
          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-[#C5D9E8] to-[#6B8DB8] rounded-full flex items-center justify-center">
                <span className="text-2xl font-medium text-white">3</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl mb-3 text-[#4A5568]">Get Support & Resources</h3>
              <p className="text-lg text-[#718096] leading-relaxed mb-4">
                Receive validation, coping strategies, and connections to professional resources when you're ready. You're in control every step of the way.
              </p>
              <div className="bg-[#F7FAFC] p-6 rounded-2xl inline-flex items-center gap-4">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 4L6 9V15C6 21 10 26.3 16 28C22 26.3 26 21 26 15V9L16 4Z"
                    stroke="#6B8DB8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path
                    d="M12 16L14.5 18.5L20 13"
                    stroke="#6B8DB8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[#4A5568]">Always in your control</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <button className="px-10 py-4 bg-[#6B8DB8] text-white text-lg rounded-full hover:bg-[#5A7BA3] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Begin Your Journey
          </button>
        </div>
      </div>
    </section>
  );
}
