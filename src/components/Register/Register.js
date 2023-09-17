import "./Register.css"
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import { useState } from "react";

function Register({onRegister}) {

  const [formValue, setFormValue] = useState({
    name: '',
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
    onRegister(formValue);
  };

  return (
    <section className="register">
      <Logo />
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form" onSubmit={handleSubmit}>
      <label className="register__label">Имя
          <input className="register__input" id="name" type="name" name="name" autoComplete="name" minLength="2" maxLength="30" placeholder="Имя" value={formValue.name || ''} onChange={handleChange} required/>
          <span className="register__error" id="name-error"></span>
        </label>

        <label className="register__label">E-mail
          <input className="register__input" id="email" type="email" name="email" autoComplete="email" minLength="2" maxLength="30" placeholder="Email" value={formValue.email || ''} onChange={handleChange} required/>
          <span className="register__error" id="email-error"></span>
        </label>

        <label className="register__label">Пароль
          <input className="register__input" id="password" type="password" name="password" autoComplete="password" minLength="4" maxLength="20" placeholder="Пароль" value={formValue.password || ''} onChange={handleChange} required/>
          <span className="register__error" id="password-error"></span>
        </label>

        <button className="register__submit-button" type="submit">зарегистрироваться</button>
        <p className="register__subtitle">Уже зарегистрированы?<Link to="/signin" className="register__link app__link">Войти</Link></p>


      </form>
    </section>
      )
}

export default Register;