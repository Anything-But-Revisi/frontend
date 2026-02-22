const canUseStorage = () => typeof window !== "undefined" && !!window.localStorage;

export const getItem = (key) => {
  if (!canUseStorage()) {
    return null;
  }

  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const setItem = (key, value) => {
  if (!canUseStorage()) {
    return;
  }

  try {
    window.localStorage.setItem(key, value);
  } catch {
    // noop
  }
};

export const removeItem = (key) => {
  if (!canUseStorage()) {
    return;
  }

  try {
    window.localStorage.removeItem(key);
  } catch {
    // noop
  }
};

export const SAFESPACE_SESSION_ID_KEY = "safespace_session_id";

export const getSessionId = () => getItem(SAFESPACE_SESSION_ID_KEY);
export const setSessionId = (sessionId) => setItem(SAFESPACE_SESSION_ID_KEY, sessionId);
export const clearSessionId = () => removeItem(SAFESPACE_SESSION_ID_KEY);
