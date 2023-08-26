import "./Login.css"
import logo from '../../images/logo.png';
import { Link } from "react-router-dom";

function Login() {
  return (
    <section className="login">
      <Link to='/'><img src={logo} alt="Логотип" /></Link>
      <h2 className="login__title">Рады видеть</h2>
      <form className="login__form">
        <label className="login__label">E-mail
          <input className="login__input" id="email" type="email" name="login" minLength="2" maxLength="30" required/>
          <span className="login__error"></span>
        </label>

        <label className="login__label">Пароль
          <input className="login__input" id="password" type="password" name="password" minLength="4" maxLength="20" required/>
          <span className="login__error"></span>
        </label>

        <button className="login__submit-button" type="submit">Войти</button>
        <p className="login__subtitle">Ёщё не зарегистрированы?<Link to="/signup" className="login__link app__link">Регистрация</Link></p>


      </form>
    </section>
      )
}

export default Login;