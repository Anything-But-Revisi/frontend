import { useState } from "react";
import { useNavigate } from "react-router";
import { ClarityLogo } from "../components/clarity-logo";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <ClarityLogo size={48} />
          <h1 className="text-2xl text-[#3A4556] mt-4 mb-2">Clarity</h1>
          <p className="text-sm text-[#6B7684] text-center">
            {isLogin ? "Welcome back" : "Create your account"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-[#E9EEF5] mb-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-[#6B7684] mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#F7F9FC] border border-[#E9EEF5] rounded-lg focus:outline-none focus:border-[#5C6F8F]/30 text-[#3A4556]"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-[#6B7684] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#F7F9FC] border border-[#E9EEF5] rounded-lg focus:outline-none focus:border-[#5C6F8F]/30 text-[#3A4556]"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-[#5C6F8F] text-white rounded-xl hover:bg-[#4A5A73] transition-colors shadow-sm"
            >
              {isLogin ? "Login" : "Create Account"}
            </button>
          </div>
        </form>

        {/* Toggle */}
        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-[#6B7684] hover:text-[#5C6F8F] transition-colors"
          >
            {isLogin
              ? "Don't have an account? Create one"
              : "Already have an account? Login"}
          </button>
        </div>

        {/* Privacy Notice */}
        <div className="mt-6 bg-white p-5 rounded-xl border border-[#E9EEF5]">
          <p className="text-sm text-[#6B7684] leading-relaxed text-center">
            Your data remains private and encrypted. We never share or sell your information.
          </p>
        </div>

        {/* Continue without account */}
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/home")}
            className="text-sm text-[#5C6F8F] hover:underline"
          >
            Continue without an account
          </button>
        </div>
      </div>
    </div>
  );
}
