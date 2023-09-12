import "./Register.css"
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

function Register() {
  return (
    <section className="register">
      <Logo />
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form">
      <label className="register__label">Имя
          <input className="register__input" id="name" type="name" name="name" minLength="2" maxLength="30" placeholder="Имя" required/>
          <span className="register__error" id="name-error"></span>
        </label>

        <label className="register__label">E-mail
          <input className="register__input" id="email" type="email" name="login" minLength="2" maxLength="30" placeholder="Email" required/>
          <span className="register__error" id="email-error"></span>
        </label>

        <label className="register__label">Пароль
          <input className="register__input" id="password" type="password" name="password" minLength="4" maxLength="20" placeholder="Пароль" required/>
          <span className="register__error" id="password-error"></span>
        </label>

        <button className="register__submit-button" type="submit">зарегистрироваться</button>
        <p className="register__subtitle">Уже зарегистрированы?<Link to="/signin" className="register__link app__link">Войти</Link></p>


      </form>
    </section>
      )
}

export default Register;