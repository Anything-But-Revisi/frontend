import { useState } from "react";
import { TopNav } from "../components/top-nav";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Saya di sini untuk membantu Anda memahami situasi Anda dan memberikan panduan yang aman dan praktis.",
    },
  ]);
  const [input, setInput] = useState("");

  const suggestedPrompts = [
    "Bagaimana saya menilai tingkat risiko?",
    "Apa yang terjadi jika saya melaporkan?",
    "Apa yang harus saya lakukan selanjutnya?",
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        role: "assistant",
        content: generateResponse(input),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 500);

    setInput("");
  };

  const generateResponse = (query: string): string => {
    if (query.toLowerCase().includes("risk")) {
      return "Risk levels are assessed based on:\n• Power dynamics between parties\n• Severity of incident\n• Presence of evidence\n• Potential for retaliation\n\nYour situation shows moderate risk factors.";
    }
    if (query.toLowerCase().includes("report")) {
      return "Reporting pathways vary by context:\n• Internal HR or Title IX office\n• External regulatory bodies\n• Legal counsel\n\nEach has different timelines and protections.";
    }
    if (query.toLowerCase().includes("document")) {
      return "Safe documentation practices:\n• Use secure, private storage\n• Include dates, times, locations\n• Screenshot messages immediately\n• Keep original copies\n• Do not confront the person";
    }
    return "I understand this is difficult. Could you clarify what specific aspect you'd like guidance on?";
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
    handleSend();
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col">
      <TopNav showBack variant="light" />
      
      {/* Context Summary */}
      <div className="pt-16 px-5 max-w-md mx-auto w-full">
        <div className="bg-white p-4 rounded-xl border border-[#E8ECF3] mt-4 shadow-sm">
          <p className="text-sm text-[#596577] leading-relaxed">
            Kasus Anda: Anda mengalami pelecehan verbal di tempat kerja oleh atasan Anda selama 3 bulan terakhir. Insiden terbaru terjadi minggu lalu di depan rekan kerja lain.
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 max-w-md mx-auto w-full py-6 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-xl ${
                message.role === "user"
                  ? "bg-[#C44C55] text-white"
                  : "bg-white text-[#3A4556] border border-[#E8ECF3] shadow-sm"
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-line">
                {message.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Prompts */}
      {messages.length <= 2 && (
        <div className="px-5 max-w-md mx-auto w-full pb-4">
          <div className="flex gap-2 flex-wrap">
            {suggestedPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="px-4 py-2 bg-white text-[#8C3F48] text-sm border border-[#E8ECF3] rounded-full hover:bg-[#FFF6F7] hover:border-[#C44C55]/30 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-5 max-w-md mx-auto w-full pb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ketik Sesuatu..."
            className="flex-1 px-4 py-3 bg-white border border-[#E8ECF3] rounded-xl focus:outline-none focus:border-[#C44C55]/35 text-[#3A4556] placeholder:text-[#9AA4B2]"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={`px-6 py-3 rounded-xl transition-colors ${
              input.trim()
                ? "bg-[#C44C55] text-white hover:bg-[#B2434C]"
                : "bg-[#E8ECF3] text-[#8A94A3]"
            }`}
          >
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
}
