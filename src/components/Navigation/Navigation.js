import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

function Navigation({ isLoggedIn }) {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);

  const toggleBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  return (
    <nav className="navigation-menu">
      {isLoggedIn ? (
        <>
          <div className="navigation-menu__container-movies">
            <Link to="/movies" className="navigation-menu__link app__link">
              Фильмы
            </Link>
            <Link to="/saved-movies" className="navigation-menu__link app__link">
              Сохранённые фильмы
            </Link>
          </div>
          <div>
            <Link to="/profile">
              <button
               className="navigation-menu__button-account">Аккаунт</button>
            </Link>
          </div>
        </>
      ) : (
        <div className="navigation-menu__container-auth">
          <Link to="/signup" className="navigation-menu__link app__link">
            Регистрация
          </Link>
          <Link to="/signin" className="navigation-menu__button app__link">
            Войти
          </Link>
        </div>
      )}
      {/* {!isBurgerMenuOpen && isLoggedIn ? ( */}
      {!isBurgerMenuOpen ? (
        <button className="navigation-menu__button-burger" onClick={toggleBurgerMenu} />
      ) : (
        <BurgerMenu onClose={toggleBurgerMenu} />
      )}
    </nav>
  );
}

export default Navigation;
