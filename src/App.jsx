import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AppContext from "./Context/AppContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import {
  clearAuthUser,
  getAuthUser,
  getChats,
  getTheme,
  getUsers,
  saveAuthUser,
  saveChats,
  saveTheme,
  saveUsers,
} from "./utils/storage";
import { getAIResponse } from "./utils/api";

const createId = (prefix) =>
  `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

const getTime = () =>
  new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());

const createNewChat = () => ({
  chatId: createId("chat"),
  title: "New Chat",
  createdAt: new Date().toISOString(),
  messages: [],
});

const getChatTitle = (message) => {
  const title = message.trim().replace(/\s+/g, " ").slice(0, 38);
  return title || "New Chat";
};

const App = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(getUsers);
  const [authUser, setAuthUser] = useState(getAuthUser);
  const [chats, setChats] = useState(() => getChats(getAuthUser()?.email));
  const [activeChatId, setActiveChatId] = useState(
    () => getChats(getAuthUser()?.email)[0]?.chatId || "",
  );
  const [theme, setTheme] = useState(getTheme);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    saveUsers(users);
  }, [users]);

  useEffect(() => {
    saveChats(authUser?.email, chats);
  }, [authUser?.email, chats]);

  useEffect(() => {
    const userChats = getChats(authUser?.email);
    setChats(userChats);
    setActiveChatId(userChats[0]?.chatId || "");
  }, [authUser?.email]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    saveTheme(theme);
  }, [theme]);

  const activeChat = useMemo(
    () => chats.find((chat) => chat.chatId === activeChatId) || null,
    [activeChatId, chats],
  );

  const signup = (formData) => {
    const userExists = users.some((user) => user.email === formData.email);
    if (userExists) {
      return { success: false, message: "User already exists. Please login." };
    }

    const newUser = {
      id: createId("user"),
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);
    saveAuthUser(newUser);
    setAuthUser(newUser);
    setChats([]);
    setActiveChatId("");
    navigate("/");
    return { success: true };
  };

  const login = ({ email, password }) => {
    const user = users.find(
      (currentUser) =>
        currentUser.email === email && currentUser.password === password,
    );

    if (!user) {
      return { success: false, message: "Invalid email or password." };
    }

    saveAuthUser(user);
    setAuthUser(user);
    const userChats = getChats(user.email);
    setChats(userChats);
    setActiveChatId(userChats[0]?.chatId || "");
    navigate("/");
    return { success: true };
  };

  const logout = () => {
    clearAuthUser();
    setAuthUser(null);
    setChats([]);
    setActiveChatId("");
    navigate("/login");
  };

  const startNewChat = () => {
    const newChat = createNewChat();
    setChats((prevChats) => [newChat, ...prevChats]);
    setActiveChatId(newChat.chatId);
    setIsSidebarOpen(false);
  };

  const renameChat = (chatId, title) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.chatId === chatId ? { ...chat, title } : chat,
      ),
    );
  };

  const deleteChat = (chatId) => {
    setChats((prevChats) => {
      const filteredChats = prevChats.filter((chat) => chat.chatId !== chatId);
      if (activeChatId === chatId) {
        setActiveChatId(filteredChats[0]?.chatId || "");
      }
      return filteredChats;
    });
  };

  const sendMessage = async (content) => {
    const userMessage = {
      id: createId("message"),
      role: "user",
      content,
      timestamp: getTime(),
    };

    const chatId = activeChatId || createId("chat");
    const currentChat = chats.find((chat) => chat.chatId === chatId) || {
      chatId,
      title: getChatTitle(content),
      createdAt: new Date().toISOString(),
      messages: [],
    };

    const updatedMessages = [...currentChat.messages, userMessage];

    setActiveChatId(chatId);
    setChats((prevChats) => {
      const chatExists = prevChats.some((chat) => chat.chatId === chatId);
      const updatedChat = {
        ...currentChat,
        title: currentChat.messages.length
          ? currentChat.title
          : getChatTitle(content),
        messages: updatedMessages,
      };
      return chatExists
        ? prevChats.map((chat) => (chat.chatId === chatId ? updatedChat : chat))
        : [updatedChat, ...prevChats];
    });

    setIsTyping(true);
    try {
      const reply = await getAIResponse(updatedMessages);
      const assistantMessage = {
        id: createId("message"),
        role: "assistant",
        content: reply,
        timestamp: getTime(),
      };

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.chatId === chatId
            ? { ...chat, messages: [...chat.messages, assistantMessage] }
            : chat,
        ),
      );
    } catch (error) {
      const errorMessage = {
        id: createId("message"),
        role: "assistant",
        content: error.message,
        timestamp: getTime(),
      };

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.chatId === chatId
            ? { ...chat, messages: [...chat.messages, errorMessage] }
            : chat,
        ),
      );
    } finally {
      setIsTyping(false);
    }
  };

  const contextValue = {
    users,
    authUser,
    chats,
    activeChat,
    activeChatId,
    theme,
    isSidebarOpen,
    isTyping,
    signup,
    login,
    logout,
    startNewChat,
    renameChat,
    deleteChat,
    sendMessage,
    setActiveChatId,
    setTheme,
    setIsSidebarOpen,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignupPage />}
        />
      </Routes>
    </AppContext.Provider>
  );
};

export default App;
