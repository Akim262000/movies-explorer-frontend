import "./Login.css"
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

function Login() {
  return (
    <section className="login">
      <Logo />
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__form">
        <label className="login__label">E-mail
          <input className="login__input" id="email" type="email" name="login" minLength="2" maxLength="30" required/>
          <span className="login__error" id="email-error"></span>
        </label>

        <label className="login__label">Пароль
          <input className="login__input" id="password" type="password" name="password" minLength="4" maxLength="20" required/>
          <span className="login__error" id="password-error"></span>
        </label>

        <button className="login__submit-button" type="submit">Войти</button>
        <p className="login__subtitle">Ёщё не зарегистрированы?<Link to="/signup" className="login__link app__link">Регистрация</Link></p>


      </form>
    </section>
      )
}

export default Login;