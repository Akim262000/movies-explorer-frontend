import "./Header.css";
import Navigation from '../Navigation/Navigation';
import Logo from "../Logo/Logo";

function Header({isLoggedIn}) {
  return (
    <header className="header">
      <Logo />
      <Navigation isLoggedIn={isLoggedIn}/>
    </header>
  );
}

export default Header;
