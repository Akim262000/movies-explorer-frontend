import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import './Logo.css'

function Logo() {
  return (
    <Link to="/">
      <img className="logo" src={logo} alt="Логотип" />
    </Link>
  )
}

export default Logo;