import { Bot, Moon, Sun } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../Context/AppContext";

const SignupPage = () => {
  const { signup, theme, setTheme } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = signup(formData);
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
        <h1>Signup</h1>
        <p>Create an account with localStorage authentication.</p>

        {error && <span className="form-error">{error}</span>}

        <label>
          Name
          <input
            type="text"
            value={formData.name}
            onChange={(event) =>
              setFormData({ ...formData, name: event.target.value })
            }
            required
          />
        </label>

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
            minLength="6"
            value={formData.password}
            onChange={(event) =>
              setFormData({ ...formData, password: event.target.value })
            }
            required
          />
        </label>

        <button className="primary-button full-button">Signup</button>
        <p className="auth-switch">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </main>
  );
};

export default SignupPage;
