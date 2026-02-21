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
      content: "I'm here to help you navigate your situation. You can ask me anything.",
    },
  ]);
  const [input, setInput] = useState("");

  const suggestedPrompts = [
    "Explain my risk level",
    "What happens if I report?",
    "How do I document safely?",
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
      <TopNav showBack />
      
      {/* Context Summary */}
      <div className="pt-16 px-5 max-w-md mx-auto w-full">
        <div className="bg-white p-4 rounded-xl border border-[#E9EEF5] mt-4">
          <p className="text-sm text-[#6B7684]">
            Current case: Workplace-based harassment
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
                  ? "bg-[#5C6F8F] text-white"
                  : "bg-white text-[#3A4556] border border-[#E9EEF5]"
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
                className="px-4 py-2 bg-white text-[#5C6F8F] text-sm border border-[#E9EEF5] rounded-full hover:border-[#5C6F8F]/30 transition-colors"
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
            placeholder="Type your question..."
            className="flex-1 px-4 py-3 bg-white border border-[#E9EEF5] rounded-xl focus:outline-none focus:border-[#5C6F8F]/30 text-[#3A4556]"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={`px-6 py-3 rounded-xl transition-colors ${
              input.trim()
                ? "bg-[#6BA8A9] text-white hover:bg-[#5A9091]"
                : "bg-[#E9EEF5] text-[#6B7684]"
            }`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
