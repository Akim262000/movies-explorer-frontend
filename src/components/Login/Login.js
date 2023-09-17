import "./Login.css"
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import { useState } from "react";

function Login({onLogin}) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formValue);
  };

  return (
    <section className="login">
      <Logo />
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <label className="login__label">E-mail
          <input className="login__input" id="email" type="email" name="email" autoComplete="email" minLength="2" maxLength="30" placeholder="Email" value={formValue.email} onChange={handleChange} required/>
          <span className="login__error" id="email-error"></span>
        </label>

        <label className="login__label">Пароль
          <input className="login__input" id="password" type="password" name="password" autoComplete="password" minLength="4" maxLength="20" placeholder="Пароль" value={formValue.password} onChange={handleChange} required/>
          <span className="login__error" id="password-error"></span>
        </label>

        <button className="login__submit-button" type="submit">Войти</button>
        <p className="login__subtitle">Ёщё не зарегистрированы?<Link to="/signup" className="login__link app__link">Регистрация</Link></p>


      </form>
    </section>
      )
}

export default Login;