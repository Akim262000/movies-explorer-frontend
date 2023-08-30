import { Link } from "react-router-dom";
import "./Navigation.css"

function Navigation() {
  return (
    <nav className="navigation-menu">
      <div className="navigation-menu__container">
          <Link to="/movies" className="navigation-menu__link app__link">Фильм</Link>
          <Link to="/saved-movies" className="navigation-menu__link app__link">Сохраненный фильм</Link>
        </div>
        <div className="navigation-menu__container">
          <Link to="/signup" className="navigation-menu__link app__link">Регистрация</Link>
          <Link to="/signin" className="navigation-menu__link app__link">Войти</Link>
        </div>
      </nav>
  )
}

export default Navigation;