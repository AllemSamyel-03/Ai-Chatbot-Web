import { Bot } from "lucide-react";
import { useContext, useEffect, useRef } from "react";
import AppContext from "../../Context/AppContext";
import ChatInput from "../ChatInput";
import MessageBubble from "../MessageBubble";
import SkeletonLoader from "../SkeletonLoader";

const ChatWindow = () => {
  const { activeChat, isTyping, startNewChat } = useContext(AppContext);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages, isTyping]);

  return (
    <main className="chat-window">
      <section className="messages-panel">
        {!activeChat || activeChat.messages.length === 0 ? (
          <div className="welcome-panel">
            <div className="welcome-icon">
              <Bot size={34} />
            </div>
            <h2>Start a focused AI conversation</h2>
            <p>
              Ask a question, create multiple chats, rename useful threads, and
              keep everything saved in localStorage.
            </p>
            <button className="primary-button" onClick={startNewChat}>
              Create Chat
            </button>
          </div>
        ) : (
          activeChat.messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}
        {isTyping && <SkeletonLoader />}
        <div ref={messagesEndRef} />
      </section>
      <ChatInput />
    </main>
  );
};

export default ChatWindow;
