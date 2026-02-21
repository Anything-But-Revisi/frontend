import { useState } from "react";
import { TopNav } from "../components/top-nav";

export function Settings() {
  const [anonymousMode, setAnonymousMode] = useState(true);
  const [autoClear, setAutoClear] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <TopNav showBack />
      
      <main className="pt-20 pb-8 px-5 max-w-md mx-auto">
        <h2 className="text-2xl text-[#3A4556] mb-6 leading-snug">
          Settings
        </h2>

        {/* Privacy Section */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-[#6B7684] mb-3 px-1">
            Privacy
          </h3>
          <div className="bg-white rounded-xl border border-[#E9EEF5] divide-y divide-[#E9EEF5]">
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#3A4556]">Anonymous Mode</span>
                <button
                  onClick={() => setAnonymousMode(!anonymousMode)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    anonymousMode ? "bg-[#5C6F8F]" : "bg-[#E9EEF5]"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      anonymousMode ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
              <p className="text-sm text-[#6B7684] leading-relaxed">
                When enabled, no personal identifiers are stored
              </p>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#3A4556]">Auto-clear Session</span>
                <button
                  onClick={() => setAutoClear(!autoClear)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    autoClear ? "bg-[#5C6F8F]" : "bg-[#E9EEF5]"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      autoClear ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
              <p className="text-sm text-[#6B7684] leading-relaxed">
                Automatically clear data when you close the app
              </p>
            </div>
          </div>
        </div>

        {/* Display Section */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-[#6B7684] mb-3 px-1">
            Display
          </h3>
          <div className="bg-white rounded-xl border border-[#E9EEF5] divide-y divide-[#E9EEF5]">
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#3A4556]">Soft Dark Mode</span>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    darkMode ? "bg-[#5C6F8F]" : "bg-[#E9EEF5]"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      darkMode ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
              <p className="text-sm text-[#6B7684] leading-relaxed">
                Uses deep slate blue background for reduced eye strain
              </p>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-[#6B7684] mb-3 px-1">
            Security
          </h3>
          <div className="bg-white rounded-xl border border-[#E9EEF5]">
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#3A4556]">Session Timeout</span>
                <select className="px-3 py-1.5 bg-[#F7F9FC] border border-[#E9EEF5] rounded-lg text-sm text-[#3A4556]">
                  <option>15 minutes</option>
                  <option>30 minutes</option>
                  <option>1 hour</option>
                  <option>Never</option>
                </select>
              </div>
              <p className="text-sm text-[#6B7684] leading-relaxed">
                Automatically log out after period of inactivity
              </p>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="space-y-3">
          <button className="w-full py-4 px-6 bg-white text-[#5C6F8F] border border-[#5C6F8F]/20 rounded-xl hover:bg-[#F7F9FC] transition-colors text-left">
            Export My Data
          </button>
          <button className="w-full py-4 px-6 bg-white text-[#C97B7B] border border-[#C97B7B]/20 rounded-xl hover:bg-[#F7F9FC] transition-colors text-left">
            Delete All Data
          </button>
        </div>
      </main>
    </div>
  );
}
