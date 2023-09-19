import { Link } from "react-router-dom";
import "./Profile.css"
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React, { useContext } from "react";

function Profile({isLoggedIn, onSignOut, onUpdateUser}) {

  const currentUser = useContext(CurrentUserContext);

  const [enteredValues, setEnteredValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isFormValid, setIsFormValid] = React.useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setEnteredValues({
      ...enteredValues,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: event.target.validationMessage,
    });

    setIsFormValid(event.target.closest(".form").checkValidity());
  };

  const resetForm = React.useCallback(
    (newValues = {}, newErrors = {}, newIsFormValid = false) => {
      setEnteredValues(newValues);
      setErrors(newErrors);
      setIsFormValid(newIsFormValid);
    },
    [setEnteredValues, setErrors, setIsFormValid]
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name: enteredValues.name,
      email: enteredValues.email,
    });
  };

  React.useEffect(() => {
    currentUser ? resetForm(currentUser) : resetForm();
  }, [currentUser, resetForm]);

  
  const isValueSameAsWas = (!isFormValid || (currentUser.name === enteredValues.name && currentUser.email === enteredValues.email));

  return (
    <>
    <section className="profile">
    <Header isLoggedIn={isLoggedIn} />
      <div className="profile__container">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form className="profile__form" onSubmit={handleSubmit}>
          <label className="profile__label">Имя
            <input className="profile__input" value={enteredValues.name || ""} type="text" name="name" id="name" minLength="2" maxLength="30" onChange={handleChange} required ></input>
            <span className="profile__error" id="name-error"></span>
          </label>
          <label className="profile__label">Email
            <input className="profile__input" value={enteredValues.email || ""} type="email" name="email" id="email" minLength="2" maxLength="30" onChange={handleChange} required ></input>
            <span className="profile__error" id="email-error"></span>
          </label>
          <button className="profile__button profile__button_type_edit app__link" disabled={isValueSameAsWas}>Редактировать</button>
          <button className="profile__button profile__button_type_exit">
            <Link className="profile__link app__link" to="/" onClick={() => onSignOut()}>Выйти из аккаунта</Link>
          </button>
        </form>
      </div>
    </section>
    </>
  )
}

export default Profile;