import { Send } from "lucide-react";
import { useContext, useState } from "react";
import AppContext from "../../Context/AppContext";

const ChatInput = () => {
  const { sendMessage, isTyping } = useContext(AppContext);
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!message.trim() || isTyping) {
      return;
    }

    sendMessage(message.trim());
    setMessage("");
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <textarea
        value={message}
        placeholder="Ask about React, JavaScript, projects..."
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(event);
          }
        }}
      />
      <button
        className="send-button"
        disabled={!message.trim() || isTyping}
        title="Send message"
      >
        <Send size={19} />
      </button>
    </form>
  );
};

export default ChatInput;
