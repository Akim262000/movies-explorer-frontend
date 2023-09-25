import "./Login.css";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import { useState } from "react";
import { useFormWithValidation } from "../../hooks/formWithValidation";

function Login({ onLogin }) {

  const {values, errors, isValid, handleChange} = useFormWithValidation();

  // ---ОБРАБОТЧИКИ---
  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values.email, values.password);
  };

  

  return (
    <section className="login">
      <Logo />
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <label className="login__label">
          E-mail
          <input
            className="login__input"
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            minLength="2"
            maxLength="30"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            required
          />
          <span className="login__error" id="email-error">
            {errors.email || ""}
          </span>
        </label>

        <label className="login__label">
          Пароль
          <input
            className="login__input"
            id="password"
            type="password"
            name="password"
            autoComplete="password"
            minLength="8"
            maxLength="20"
            placeholder="Пароль"
            value={values.password}
            onChange={handleChange}
            required
          />
          <span className="login__error" id="password-error">
            {errors.password || ""}
          </span>
        </label>

        <button className="login__submit-button" type="submit" disabled={!isValid}>
          Войти
        </button>
        <p className="login__subtitle">
          Ёщё не зарегистрированы?
          <Link to="/signup" className="login__link app__link">
            Регистрация
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Login;
