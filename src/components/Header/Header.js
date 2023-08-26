import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.png";

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="Логотип" />
      </Link>
      <nav className="header__menu">
      <div className="header__menu-container">
          <Link to="/movies" className="header__film-link app__link">Фильм</Link>
          <Link to="/saved-movies" className="header__film-link app__link">Сохраненный фильм</Link>
        </div>
        <div className="header__menu-container">
          <Link to="/sign-up" className="header__link app__link">Регистрация</Link>
          <Link to="/sign-in" className="header__link app__link">Войти</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
