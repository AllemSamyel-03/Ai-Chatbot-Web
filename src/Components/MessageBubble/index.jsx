import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { useContext } from "react";
import AppContext from "../../Context/AppContext";

const markdownComponents = {
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  ),
};

const MessageBubble = ({ message }) => {
  const { authUser } = useContext(AppContext);
  const isUser = message.role === "user";
  const userInitial = authUser?.name?.charAt(0).toUpperCase() || "U";

  return (
    <motion.div
      className={`message-row ${isUser ? "user-message" : "assistant-message"}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
    >
      <div className="message-avatar">{isUser ? userInitial : "AI"}</div>
      <div className="message-content">
        <div className="message-bubble">
          <ReactMarkdown components={markdownComponents}>
            {message.content}
          </ReactMarkdown>
        </div>
        <span className="message-time">{message.timestamp}</span>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
