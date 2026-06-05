import { Edit3, MessageSquare, Plus, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import AppContext from "../../Context/AppContext";

const Sidebar = () => {
  const {
    chats,
    activeChatId,
    isSidebarOpen,
    startNewChat,
    setActiveChatId,
    renameChat,
    deleteChat,
    setIsSidebarOpen,
  } = useContext(AppContext);

  const handleRename = (chat) => {
    const title = window.prompt("Rename chat", chat.title);
    if (title?.trim()) {
      renameChat(chat.chatId, title.trim());
    }
  };

  return (
    <>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.button
            className="sidebar-backdrop"
            aria-label="Close sidebar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div>
            <span className="eyebrow">Workspace</span>
            <h2>Chat History</h2>
          </div>
          <button
            className="icon-button mobile-only"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        <button className="new-chat-button" onClick={startNewChat}>
          <Plus size={18} />
          Start new chat
        </button>

        <div className="chat-list">
          {chats.length === 0 ? (
            <p className="empty-text">No chats yet. Start with a question.</p>
          ) : (
            chats.map((chat) => (
              <motion.div
                className={`chat-item ${chat.chatId === activeChatId ? "active" : ""}`}
                key={chat.chatId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <button
                  className="chat-select"
                  onClick={() => {
                    setActiveChatId(chat.chatId);
                    setIsSidebarOpen(false);
                  }}
                >
                  <MessageSquare size={18} />
                  <span>{chat.title}</span>
                </button>
                <div className="chat-actions">
                  <button
                    className="mini-button"
                    onClick={() => handleRename(chat)}
                  >
                    <Edit3 size={15} />
                  </button>
                  <button
                    className="mini-button danger"
                    onClick={() => deleteChat(chat.chatId)}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
