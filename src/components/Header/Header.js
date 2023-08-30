import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.png";
import Navigation from '../Navigation/Navigation';

function Header({isLoggedIn}) {
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="Логотип" />
      </Link>
      <Navigation isLoggedIn={isLoggedIn}/>
    </header>
  );
}

export default Header;
