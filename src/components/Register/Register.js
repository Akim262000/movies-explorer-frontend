import "./Register.css";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import { useFormWithValidation } from "../../hooks/formWithValidation";

function Register({ onRegister }) {
  const { values, errors, isValid, handleChange, isLoading, setIsLoading } = useFormWithValidation({name: '', email: '', password: ''});

  // ---ОБРАБОТЧИКИ---
  async function handleSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    await onRegister(values.name, values.email, values.password);
    setIsLoading(false);
  }

  return (
    <section className="register">
      <Logo />
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <label className="register__label">
          Имя
          <input
            className="register__input"
            id="name"
            type="name"
            name="name"
            autoComplete="name"
            minLength="2"
            maxLength="30"
            placeholder="Имя"
            value={values.name || ""}
            pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
            onChange={handleChange}
            disabled={isLoading}
            required
          />
          <span className="register__error" id="name-error">
            {errors.name ? `Поле должно быть заполнено и может содержать только латиницу,
                кириллицу, пробел или дефис` : ""}
          </span>
        </label>

        <label className="register__label">
          E-mail
          <input
            className="register__input"
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            minLength="2"
            maxLength="30"
            placeholder="Email"
            value={values.email || ""}
            pattern="[a-zA-Z0-9._\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
            onChange={handleChange}
            disabled={isLoading}
            required
          />
          <span className="register__error" id="email-error">
            {errors.email || ""}
          </span>
        </label>

        <label className="register__label">
          Пароль
          <input
            className="register__input"
            id="password"
            type="password"
            name="password"
            autoComplete="password"
            minLength="4"
            maxLength="20"
            placeholder="Пароль"
            value={values.password || ""}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
          <span className="register__error" id="password-error">
            {errors.password || ""}
          </span>
        </label>

        <button className="register__submit-button" type="submit" disabled={!isValid || isLoading}>
          зарегистрироваться
        </button>
        <p className="register__subtitle">
          Уже зарегистрированы?
          <Link to="/signin" className="register__link app__link">
            Войти
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Register;
