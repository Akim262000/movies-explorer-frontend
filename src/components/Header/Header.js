import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.png";
import Navigation from '../Navigation/Navigation';

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="Логотип" />
      </Link>
      <Navigation />
    </header>
  );
}

export default Header;
