import { Bot, Moon, Sun } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../Context/AppContext";

const LoginPage = () => {
  const { login, theme, setTheme } = useContext(AppContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = login(formData);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <main className="auth-page">
      <button
        className="auth-theme-button"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        title="Toggle theme"
      >
        {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
      </button>
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-logo">
          <Bot size={28} />
        </div>
        <h1>Login</h1>
        <p>Continue your saved AI conversations.</p>

        {error && <span className="form-error">{error}</span>}

        <label>
          Email
          <input
            type="email"
            value={formData.email}
            onChange={(event) =>
              setFormData({ ...formData, email: event.target.value })
            }
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={formData.password}
            onChange={(event) =>
              setFormData({ ...formData, password: event.target.value })
            }
            required
          />
        </label>

        <button className="primary-button full-button">Login</button>
        <p className="auth-switch">
          New user? <Link to="/signup">Create account</Link>
        </p>
      </form>
    </main>
  );
};

export default LoginPage;
