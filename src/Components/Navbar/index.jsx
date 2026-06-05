import { LogOut, Menu, Moon, Plus, Sun } from "lucide-react";
import { useContext, useState } from "react";
import AppContext from "../../Context/AppContext";

const Navbar = () => {
  const { authUser, logout, startNewChat, theme, setTheme, setIsSidebarOpen } =
    useContext(AppContext);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const userInitial = authUser?.name?.charAt(0).toUpperCase() || "U";

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button
          className="icon-button mobile-only"
          onClick={() => setIsSidebarOpen(true)}
          title="Open sidebar"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1>AI Chatbot</h1>
          <p>Welcome, {authUser?.name}</p>
        </div>
      </div>

      <div className="navbar-actions">
        <button className="primary-button" onClick={startNewChat}>
          <Plus size={18} />
          New Chat
        </button>
        <button
          className="icon-button"
          onClick={toggleTheme}
          title="Toggle theme"
        >
          {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
        </button>
        <div className="profile-menu">
          <button
            className="profile-button"
            onClick={() => setIsProfileOpen((currentValue) => !currentValue)}
            title={authUser?.name}
          >
            {userInitial}
          </button>
          {isProfileOpen && (
            <div className="profile-popup">
              <strong>{authUser?.name}</strong>
              <span>{authUser?.email}</span>
            </div>
          )}
        </div>
        <button className="icon-button" onClick={logout} title="Logout">
          <LogOut size={19} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
