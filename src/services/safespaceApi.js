import { apiClient } from "./httpClient";
import { normalizeApiError, normalizeApiSuccess } from "./apiContract";
import { clearSessionId, getSessionId, setSessionId } from "./storage";

const validateSessionId = (sessionId) => {
  if (!sessionId || typeof sessionId !== "string") {
    throw {
      status: 422,
      message: "Session ID wajib diisi.",
      details: { field: "session_id" },
      code: "INVALID_SESSION_ID",
    };
  }

  return sessionId.trim();
};

const resolveSessionId = (sessionId) => {
  const resolvedSessionId = sessionId ?? getSessionId();
  return validateSessionId(resolvedSessionId);
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
    const normalizedResponse = normalizeApiSuccess(
      "createSession",
      response.data,
    );

    if (normalizedResponse.session_id) {
      setSessionId(normalizedResponse.session_id);
    }

    return normalizedResponse;
  } catch (error) {
    throw normalizeApiError(error);
  }
};

export const deleteSession = async (sessionId) => {
  try {
    const resolvedSessionId = resolveSessionId(sessionId);
    await apiClient.delete(`/api/v1/sessions/${resolvedSessionId}`);
    clearSessionId();
    return normalizeApiSuccess("deleteSession", {
      session_id: resolvedSessionId,
    });
  } catch (error) {
    throw normalizeApiError(error);
  }
};

export const sendMessage = async ({ sessionId, message }) => {
  try {
    const resolvedSessionId = resolveSessionId(sessionId);
    const normalizedMessage = validateMessage(message);
    const response = await apiClient.post(
      `/api/v1/sessions/${resolvedSessionId}/chat`,
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
    const resolvedSessionId = resolveSessionId(sessionId);
    const response = await apiClient.get(
      `/api/v1/sessions/${resolvedSessionId}/chat`,
    );
    return normalizeApiSuccess("getChatHistory", response.data);
  } catch (error) {
    throw normalizeApiError(error);
  }
};
