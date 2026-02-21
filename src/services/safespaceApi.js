import { apiClient } from "./httpClient";
import { normalizeApiError, normalizeApiSuccess } from "./apiContract";

const validateSessionId = (sessionId) => {
  if (!sessionId || typeof sessionId !== "string") {
    throw {
      status: 422,
      message: "Session ID wajib diisi.",
      details: { field: "session_id" },
      code: "INVALID_SESSION_ID",
    };
  }
};

const validateMessage = (message) => {
  if (typeof message !== "string") {
    throw {
      status: 422,
      message: "Message harus berupa teks.",
      details: { field: "message" },
      code: "INVALID_MESSAGE_TYPE",
    };
  }

  const trimmed = message.trim();

  if (!trimmed || trimmed.length > 4096) {
    throw {
      status: 422,
      message: "Message harus diisi dengan panjang 1 sampai 4096 karakter.",
      details: { field: "message", minLength: 1, maxLength: 4096 },
      code: "INVALID_MESSAGE_LENGTH",
    };
  }

  return trimmed;
};

export const createSession = async () => {
  try {
    const response = await apiClient.post("/api/v1/sessions");
    return normalizeApiSuccess("createSession", response.data);
  } catch (error) {
    throw normalizeApiError(error);
  }
};

export const deleteSession = async (sessionId) => {
  try {
    validateSessionId(sessionId);
    await apiClient.delete(`/api/v1/sessions/${sessionId}`);
    return normalizeApiSuccess("deleteSession");
  } catch (error) {
    throw normalizeApiError(error);
  }
};

export const sendMessage = async ({ sessionId, message }) => {
  try {
    validateSessionId(sessionId);
    const normalizedMessage = validateMessage(message);
    const response = await apiClient.post(
      `/api/v1/sessions/${sessionId}/chat`,
      {
        message: normalizedMessage,
      },
    );
    return normalizeApiSuccess("sendMessage", response.data);
  } catch (error) {
    throw normalizeApiError(error);
  }
};

export const getChatHistory = async (sessionId) => {
  try {
    validateSessionId(sessionId);
    const response = await apiClient.get(`/api/v1/sessions/${sessionId}/chat`);
    return normalizeApiSuccess("getChatHistory", response.data);
  } catch (error) {
    throw normalizeApiError(error);
  }
};
