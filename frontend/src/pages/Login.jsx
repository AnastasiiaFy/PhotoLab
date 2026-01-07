import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Звідки прийшов користувач (ProtectedRoute)
  const redirectPath = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        const fullName = `${firstName} ${lastName}`;
        await register(fullName, email, password);
      }

      // повертаємо користувача туди, куди він хотів
      navigate(redirectPath, { replace: true });
    } catch (error) {
      alert(error.message || "Помилка авторизації");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>{mode === "login" ? "Увійти" : "Зареєструватися"}</h1>

        <p className="subtitle">
          {mode === "login"
            ? "Вітаємо з поверненням!"
            : "Вітаємо там, де кожне фото має значення!"}
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          {mode === "register" && (
            <>
              <label htmlFor="firstName">Імʼя</label>
              <input
                type="text"
                id="firstName"
                placeholder="Введіть імʼя"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />

              <label htmlFor="lastName">Прізвище</label>
              <input
                type="text"
                id="lastName"
                placeholder="Введіть прізвище"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </>
          )}

          <label htmlFor="email">Електронна пошта</label>
          <input
            type="email"
            id="email"
            placeholder="Введіть email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            placeholder="Введіть пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">
            {mode === "login" ? "Увійти" : "Зареєструватися"}
          </button>
        </form>

        <button
          className="switch-mode-btn"
          onClick={() =>
            setMode((prev) => (prev === "login" ? "register" : "login"))
          }
        >
          {mode === "login"
            ? "Не маєш акаунту? Зареєструватися"
            : "Вже маєш акаунт? Увійти"}
        </button>
      </div>
    </div>
  );
};

export default Login;
