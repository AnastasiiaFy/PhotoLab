import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // тут можна додати логіку авторизації
    console.log("Email:", email, "Password:", password);
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

        <form className="login-form" onSubmit={handleLogin}>

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

