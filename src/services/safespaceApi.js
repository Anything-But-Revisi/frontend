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

const reportEnums = {
  location: ["public space", "online", "kampus", "sekolah", "workplace"],
  perpetrator: ["supervisor", "colleague", "lecturer", "client", "stranger"],
  description: [
    "inappropriate comments",
    "unwanted physical touch",
    "repeated pressure",
    "threat or coercion",
    "digital harassment",
  ],
  evidence: ["messages", "emails", "witness", "none"],
  user_goal: [
    "understand the risk",
    "document safely",
    "consider reporting",
    "explore options",
  ],
};

const validateReportField = (fieldName, value) => {
  if (typeof value !== "string") {
    throw {
      status: 422,
      message: `${fieldName} harus berupa teks.`,
      details: { field: fieldName },
      code: "INVALID_REPORT_FIELD_TYPE",
    };
  }

  const normalizedValue = value.trim();

  if (!reportEnums[fieldName].includes(normalizedValue)) {
    throw {
      status: 422,
      message: `${fieldName} tidak valid.`,
      details: {
        field: fieldName,
        allowed: reportEnums[fieldName],
        received: normalizedValue,
      },
      code: "INVALID_REPORT_FIELD_VALUE",
    };
  }

  return normalizedValue;
};

const validateReportPayload = (payload) => {
  const safePayload = payload && typeof payload === "object" ? payload : {};

  return {
    location: validateReportField("location", safePayload.location),
    perpetrator: validateReportField("perpetrator", safePayload.perpetrator),
    description: validateReportField("description", safePayload.description),
    evidence: validateReportField("evidence", safePayload.evidence),
    user_goal: validateReportField("user_goal", safePayload.user_goal),
  };
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

export const createReport = async ({ sessionId, report }) => {
  try {
    const resolvedSessionId = resolveSessionId(sessionId);
    const normalizedReportPayload = validateReportPayload(report);
    const response = await apiClient.post(
      `/api/v1/sessions/${resolvedSessionId}/report`,
      normalizedReportPayload,
    );
    return normalizeApiSuccess("createReport", response.data);
  } catch (error) {
    throw normalizeApiError(error);
  }
};

export const getReport = async (sessionId) => {
  try {
    const resolvedSessionId = resolveSessionId(sessionId);
    const response = await apiClient.get(
      `/api/v1/sessions/${resolvedSessionId}/report`,
    );
    return normalizeApiSuccess("getReport", response.data);
  } catch (error) {
    throw normalizeApiError(error);
  }
};
