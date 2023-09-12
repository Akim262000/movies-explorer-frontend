import { Link } from "react-router-dom";
import "./Profile.css"
import Header from "../Header/Header";

const name = "Виталий";
const email = "pochta@yandex.ru";

function Profile({isLoggedIn}) {
  return (
    <>
    <section className="profile">
    <Header isLoggedIn={isLoggedIn} />
      <div className="profile__container">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <form className="profile__form">
          <label className="profile__label">Имя
            <input className="profile__input" value={name} type="text" name="name" id="name" minLength="2" maxLength="30" required ></input>
            <span className="profile__error" id="name-error"></span>
          </label>
          <label className="profile__label">Email
            <input className="profile__input" value={email} type="email" name="email" id="email" minLength="2" maxLength="30" required ></input>
            <span className="profile__error" id="email-error"></span>
          </label>
          <button className="profile__button profile__button_type_edit app__link">Редактировать</button>
          <button className="profile__button profile__button_type_exit">
            <Link className="profile__link app__link" to="/">Выйти из аккаунта</Link>
          </button>
        </form>
      </div>
    </section>
    </>
  )
}

export default Profile;