export function Footer() {
  return (
    <footer className="bg-[#F7FAFC] border-t border-[#E6DFF0]/30">
      {/* Crisis hotline disclaimer */}
      <div className="bg-[#FFF9E6] border-l-4 border-[#6B8DB8] py-6 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" stroke="#6B8DB8" strokeWidth="2" fill="none"/>
                <path d="M12 8V12M12 16H12.01" stroke="#6B8DB8" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-[#4A5568] mb-2">In Crisis? Immediate Help Available</h4>
              <p className="text-[#718096] mb-3 leading-relaxed">
                If you are in immediate danger or experiencing a crisis, please contact emergency services or a crisis hotline right away.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <a
                  href="tel:988"
                  className="text-[#6B8DB8] hover:underline font-medium"
                >
                  988 Suicide & Crisis Lifeline
                </a>
                <a
                  href="https://www.rainn.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6B8DB8] hover:underline font-medium"
                >
                  RAINN National Sexual Assault Hotline: 1-800-656-4673
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
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
            <p className="text-[#718096] leading-relaxed">
              A compassionate, confidential space for sexual harassment survivors to find support and healing.
            </p>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="font-medium text-[#4A5568] mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-[#718096] hover:text-[#6B8DB8] transition-colors">
                  Crisis Hotlines
                </a>
              </li>
              <li>
                <a href="#" className="text-[#718096] hover:text-[#6B8DB8] transition-colors">
                  Support Groups
                </a>
              </li>
              <li>
                <a href="#" className="text-[#718096] hover:text-[#6B8DB8] transition-colors">
                  Self-Care Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-[#718096] hover:text-[#6B8DB8] transition-colors">
                  Legal Resources
                </a>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="font-medium text-[#4A5568] mb-4">Privacy & Legal</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-[#718096] hover:text-[#6B8DB8] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-[#718096] hover:text-[#6B8DB8] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-[#718096] hover:text-[#6B8DB8] transition-colors">
                  Data Security
                </a>
              </li>
              <li>
                <a href="#" className="text-[#718096] hover:text-[#6B8DB8] transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#E6DFF0]/30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#718096]">
            <p>
              © 2026 SafePlace. All rights reserved. Not a substitute for professional counseling.
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#6B8DB8] transition-colors">
                Accessibility
              </a>
              <a href="#" className="hover:text-[#6B8DB8] transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
