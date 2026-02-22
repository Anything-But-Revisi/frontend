import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TopNav } from "../components/top-nav";
import {
  createSession,
  deleteSession,
  getChatHistory,
  sendMessage,
} from "../../services/safespaceApi";
import { clearSessionId, getSessionId } from "../../services/storage";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ApiChatMessage {
  role: string;
  content: string;
}

const initialAssistantMessage: Message = {
  role: "assistant",
  content:
    "Saya di sini untuk membantu Anda memahami situasi Anda dan memberikan panduan yang aman dan praktis.",
};

const mapApiRoleToUiRole = (role: string): Message["role"] =>
  role === "user" ? "user" : "assistant";

const getErrorStatus = (error: unknown) => {
  if (!error || typeof error !== "object") {
    return 0;
  }

  const maybeStatus = (error as { status?: number }).status;
  return typeof maybeStatus === "number" ? maybeStatus : 0;
};

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    initialAssistantMessage,
  ]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isEndingSession, setIsEndingSession] = useState(false);
  const activeSessionRef = useRef("");

  const isBusy = isCreatingSession || isSending || isEndingSession;

  const setSession = useCallback((value: string) => {
    activeSessionRef.current = value;
    setSessionId(value);
  }, []);

  const formatApiError = useCallback((error: unknown) => {
    if (!error || typeof error !== "object") {
      return "Terjadi kesalahan yang tidak diketahui.";
    }

    const normalizedError = error as {
      status?: number;
      message?: string;
      details?: unknown;
    };

    const statusText =
      typeof normalizedError.status === "number" && normalizedError.status > 0
        ? ` (${normalizedError.status})`
        : "";

    return `${normalizedError.message ?? "Permintaan gagal."}${statusText}`;
  }, []);

  const mergeWithInitialMessage = useCallback((chatMessages: Message[]) => {
    if (chatMessages.length === 0) {
      return [initialAssistantMessage];
    }

    return chatMessages;
  }, []);

  const syncHistory = useCallback(
    async (targetSessionId: string) => {
      const history = await getChatHistory(targetSessionId);
      const mappedMessages = history.messages.map(
        (message: ApiChatMessage) => ({
          role: mapApiRoleToUiRole(message.role),
          content: message.content,
        }),
      );

      setMessages(mergeWithInitialMessage(mappedMessages));
    },
    [mergeWithInitialMessage],
  );

  const initializeSession = useCallback(async () => {
    setIsCreatingSession(true);
    setErrorMessage("");

    try {
      const persistedSessionId = getSessionId();

      if (persistedSessionId) {
        try {
          setSession(persistedSessionId);
          await syncHistory(persistedSessionId);
          return;
        } catch (error) {
          if (getErrorStatus(error) === 404) {
            clearSessionId();
            setSession("");
          } else {
            throw error;
          }
        }
      }

      const session = await createSession();
      setSession(session.session_id);
      await syncHistory(session.session_id);
    } catch (error) {
      setErrorMessage(formatApiError(error));
      setSession("");
    } finally {
      setIsCreatingSession(false);
    }
  }, [formatApiError, setSession, syncHistory]);

  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  useEffect(() => {
    return () => {
      const currentSessionId = activeSessionRef.current;
      if (currentSessionId) {
        deleteSession(currentSessionId).catch(() => {});
      }
    };
  }, []);

  const suggestedPrompts = [
    "Bagaimana saya menilai tingkat risiko?",
    "Apa yang terjadi jika saya melaporkan?",
    "Apa yang harus saya lakukan selanjutnya?",
  ];

  const handleSend = useCallback(
    async (draftMessage?: string) => {
      const messageToSend = (draftMessage ?? input).trim();
      if (!messageToSend || isBusy) {
        return;
      }

      if (!sessionId) {
        setErrorMessage("Sesi belum siap. Coba beberapa saat lagi.");
        return;
      }

      setIsSending(true);
      setErrorMessage("");

      try {
        await sendMessage({ sessionId, message: messageToSend });
        await syncHistory(sessionId);
        setInput("");
      } catch (error) {
        if (getErrorStatus(error) === 404) {
          clearSessionId();
          setSession("");
          setErrorMessage("Sesi tidak ditemukan. Silakan buat sesi baru.");
          return;
        }

        setErrorMessage(formatApiError(error));
      } finally {
        setIsSending(false);
      }
    },
    [formatApiError, input, isBusy, sessionId, syncHistory],
  );

  const handlePromptClick = useCallback(
    (prompt: string) => {
      setInput(prompt);
      void handleSend(prompt);
    },
    [handleSend],
  );

  const handleEndSession = useCallback(async () => {
    if (!sessionId || isBusy) {
      return;
    }

    setIsEndingSession(true);
    setErrorMessage("");

    try {
      await deleteSession(sessionId);
      setSession("");
      setMessages([initialAssistantMessage]);
      setInput("");
      await initializeSession();
    } catch (error) {
      setErrorMessage(formatApiError(error));
    } finally {
      setIsEndingSession(false);
    }
  }, [formatApiError, initializeSession, isBusy, sessionId, setSession]);

  const sessionStatusText = useMemo(() => {
    if (isCreatingSession) {
      return "Membuat sesi anonim...";
    }
    if (sessionId) {
      return `Sesi aktif: ${sessionId}`;
    }
    return "Belum ada sesi aktif";
  }, [isCreatingSession, sessionId]);

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col">
      <TopNav showBack variant="light" />
      
      {/* Context Summary */}
      <div className="pt-16 px-5 max-w-md mx-auto w-full">
        <div className="bg-white p-4 rounded-xl border border-[#E8ECF3] mt-4 shadow-sm">
          <p className="text-sm text-[#596577] leading-relaxed">
            Contoh Kasus Anda: Anda mengalami pelecehan verbal di tempat kerja oleh atasan Anda selama 3 bulan terakhir. Insiden terbaru terjadi minggu lalu di depan rekan kerja lain.
          </p>
          <p className="text-xs text-[#6B7684] mt-3 break-all">
            {sessionStatusText}
          </p>
          {errorMessage ? (
            <p className="text-xs text-[#C84545] mt-2">{errorMessage}</p>
          ) : null}
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => {
                void initializeSession();
              }}
              disabled={isBusy}
              className="px-3 py-2 bg-white text-[#5C6F8F] text-xs border border-[#E9EEF5] rounded-full hover:border-[#5C6F8F]/30 transition-colors disabled:opacity-50"
            >
              Muat Ulang Sesi
            </button>
            <button
              onClick={() => {
                void handleEndSession();
              }}
              disabled={isBusy || !sessionId}
              className="px-3 py-2 bg-white text-[#5C6F8F] text-xs border border-[#E9EEF5] rounded-full hover:border-[#5C6F8F]/30 transition-colors disabled:opacity-50"
            >
              Akhiri Sesi
            </button>
          </div>
        </div>
      </div>

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

      <div className="px-5 max-w-md mx-auto w-full pb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                void handleSend();
              }
            }}
            placeholder="Ketik Sesuatu..."
            className="flex-1 px-4 py-3 bg-white border border-[#E8ECF3] rounded-xl focus:outline-none focus:border-[#C44C55]/35 text-[#3A4556] placeholder:text-[#9AA4B2]"
          />
          <button
            onClick={() => {
              void handleSend();
            }}
            disabled={!input.trim() || isBusy || !sessionId}
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
