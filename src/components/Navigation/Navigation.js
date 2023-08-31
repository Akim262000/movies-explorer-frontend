import { Link } from "react-router-dom";
import "./Navigation.css"

function Navigation({isLoggedIn}) {
  return (
    <nav className="navigation-menu">
      {isLoggedIn ? (
        <>
      <div className="navigation-menu__container-movies">
          <Link to="/movies" className="navigation-menu__link app__link">Фильм</Link>
          <Link to="/saved-movies" className="navigation-menu__link app__link">Сохраненный фильм</Link>
        </div>
        <div>
          <Link to='/profile'>
            <button className="navigation-menu__button-account">Аккаунт</button>
          </Link>
        </div>
        </>
        ) : (
        <div className="navigation-menu__container-auth">
          <Link to="/signup" className="navigation-menu__link app__link">Регистрация</Link>
          <Link to="/signin" className="navigation-menu__button app__link">Войти</Link>
        </div>)}
      </nav>
  )
}

export default Navigation;