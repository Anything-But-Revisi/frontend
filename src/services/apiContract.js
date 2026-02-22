import axios from "axios";

const toObject = (value) => (value && typeof value === "object" ? value : {});

export const normalizeSessionResponse = (payload) => {
  const safePayload = toObject(payload);
  return {
    session_id: safePayload.session_id ?? "",
    created_at: safePayload.created_at ?? "",
  };
};

export const normalizeMessageResponse = (payload) => {
  const safePayload = toObject(payload);
  return {
    id: safePayload.id ?? "",
    session_id: safePayload.session_id ?? "",
    role: safePayload.role ?? "",
    content: safePayload.content ?? "",
    created_at: safePayload.created_at ?? "",
  };
};

export const normalizeChatHistoryResponse = (payload) => {
  const safePayload = toObject(payload);
  const messages = Array.isArray(safePayload.messages)
    ? safePayload.messages
    : [];

  return {
    session_id: safePayload.session_id ?? "",
    messages: messages.map(normalizeMessageResponse),
  };
};

export const normalizeReportResponse = (payload) => {
  const safePayload = toObject(payload);
  return {
    id: safePayload.id ?? "",
    session_id: safePayload.session_id ?? "",
    location: safePayload.location ?? "",
    perpetrator: safePayload.perpetrator ?? "",
    description: safePayload.description ?? "",
    evidence: safePayload.evidence ?? "",
    user_goal: safePayload.user_goal ?? "",
    generated_document:
      typeof safePayload.generated_document === "string"
        ? safePayload.generated_document
        : null,
    created_at: safePayload.created_at ?? "",
  };
};

export const normalizeApiSuccess = (kind, payload) => {
  switch (kind) {
    case "createSession":
      return normalizeSessionResponse(payload);
    case "sendMessage":
      return normalizeMessageResponse(payload);
    case "getChatHistory":
      return normalizeChatHistoryResponse(payload);
    case "createReport":
    case "getReport":
      return normalizeReportResponse(payload);
    case "deleteSession":
      return { success: true };
    default:
      return toObject(payload);
  }
};

const fallbackMessageByStatus = {
  404: "Resource tidak ditemukan.",
  422: "Permintaan tidak valid. Periksa kembali input Anda.",
  500: "Terjadi gangguan pada server. Silakan coba lagi.",
  503: "Layanan backend sedang tidak tersedia. Coba lagi beberapa saat.",
};

export const normalizeApiError = (error) => {
  if (
    error &&
    typeof error === "object" &&
    typeof error.status === "number" &&
    typeof error.message === "string"
  ) {
    return {
      status: error.status,
      message: error.message,
      details: error.details ?? null,
      code: error.code ?? "API_ERROR",
    };
  }

  if (!axios.isAxiosError(error)) {
    return {
      status: 0,
      message: "Terjadi kesalahan yang tidak diketahui.",
      details: error,
      code: "UNKNOWN_ERROR",
    };
  }

  const status = error.response?.status ?? 0;
  const data = error.response?.data;

  if (!error.response) {
    const isTimeout = error.code === "ECONNABORTED";
    return {
      status,
      message: isTimeout
        ? "Permintaan timeout. Periksa koneksi Anda lalu coba lagi."
        : "Tidak dapat terhubung ke server API. Periksa konfigurasi URL backend.",
      details: error.message,
      code: error.code ?? "NETWORK_ERROR",
    };
  }

  return {
    status,
    message:
      fallbackMessageByStatus[status] ?? "Permintaan API gagal diproses.",
    details: data ?? error.message,
    code: error.code ?? "API_ERROR",
  };
};
