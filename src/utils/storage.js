const USERS_KEY = "ai-chatbot-users";
const AUTH_KEY = "ai-chatbot-auth-user";
const THEME_KEY = "ai-chatbot-theme";

const getChatsKey = (email) => `ai-chatbot-chats-${email}`;

export const getFromStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export const setToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getUsers = () => getFromStorage(USERS_KEY, []);
export const saveUsers = (users) => setToStorage(USERS_KEY, users);

export const getAuthUser = () => getFromStorage(AUTH_KEY, null);
export const saveAuthUser = (user) => setToStorage(AUTH_KEY, user);
export const clearAuthUser = () => localStorage.removeItem(AUTH_KEY);

export const getChats = (email) =>
  email ? getFromStorage(getChatsKey(email), []) : [];
export const saveChats = (email, chats) => {
  if (email) {
    setToStorage(getChatsKey(email), chats);
  }
};

export const getTheme = () => localStorage.getItem(THEME_KEY) || "dark";
export const saveTheme = (theme) => localStorage.setItem(THEME_KEY, theme);
