import { Link } from "react-router-dom";
import "./Profile.css";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React, { useContext } from "react";
import { useFormWithValidation } from "../../hooks/formWithValidation";
import MessageInfo from "../MessageInfo/MessageInfo";

function Profile({ isLoggedIn, onSignOut, onUpdate, infoMessage }) {

  const currentUser = React.useContext(CurrentUserContext);
  const { values, errors, isValid, handleChange, setValues, setIsValid } = useFormWithValidation();
  const [isInputActive, setIsInputActive] = React.useState(false);

  // ---ЭФФЕКТЫ---
  // получаем текущие значения для установки в поля формы
  React.useEffect(() => {
    if (currentUser) {
      setValues({
        name: currentUser.name,
        email: currentUser.email,
      });
    }
  }, [setValues, currentUser]);

  // блокируем отправку формы если значения в полях и контексте одинаковые
  React.useEffect(() => {
    if (currentUser.name === values.name && currentUser.email === values.email) {
      setIsValid(false);
    }
  }, [setIsValid, values, currentUser]);

  // блокируем поля если редактирование прошло успешно
  React.useEffect(() => {
    if (infoMessage.isShown && infoMessage.code === 200) {
      setIsInputActive(false);
    }
  }, [setIsInputActive, infoMessage.isShown, infoMessage.code]);

  // ---ОБРАБОТЧИКИ---
  // обработчик отправки формы
  function handleSubmit(e) {
    e.preventDefault();
    onUpdate(values.name, values.email);
  }

  // обработчик для разблокирования полей ввода
  function handleRedactClick() {
    setIsInputActive(true);
  }

  return (
    <>
      <section className="profile">
        <Header isLoggedIn={isLoggedIn} />
        <div className="profile__container">
          <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
          <form className="profile__form" onSubmit={handleSubmit}>
            <label className="profile__label">
              Имя
              <input
                className="profile__input"
                value={values.name || ""}
                type="text"
                name="name"
                id="name"
                minLength="2"
                maxLength="30"
                onChange={handleChange}
                disabled={!isInputActive}
                required
              ></input>
              <span className="profile__error" id="name-error"></span>
            </label>
            <label className="profile__label">
              Email
              <input
                className="profile__input"
                value={values.email || ""}
                type="email"
                name="email"
                id="email"
                minLength="2"
                maxLength="30"
                onChange={handleChange}
                disabled={!isInputActive}
                required
              ></input>
              <span className="profile__error" id="email-error"></span>
            </label>

            <MessageInfo {...infoMessage} />

            {isInputActive ? (
              <button className="profile__button profile__button_type_submit app__link" type="submit" disabled={!isValid}>
                Сохранить
              </button>
            ) : (
              <>
                <button className="profile__button profile__button_type_edit app__link" type="button" onClick={handleRedactClick}>
                  Редактировать
                </button>
                <button className="profile__button profile__button_type_exit">
                  <Link className="profile__link app__link" to="/" type="button" onClick={onSignOut}>
                    Выйти из аккаунта
                  </Link>
                </button>
              </>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

export default Profile;
