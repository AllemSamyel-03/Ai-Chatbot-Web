import ChatWindow from "../../Components/ChatWindow";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";

const ChatPage = () => (
  <div className="app-shell">
    <Sidebar />
    <div className="main-area">
      <Navbar />
      <ChatWindow />
    </div>
  </div>
);

export default ChatPage;
