import { Link, NavLink } from "react-router-dom";
import './BurgerMenu.css'

const burgerMenuClass = ({ isActive }) => (isActive ? "burger__menu__link_active" : "burger__menu__link")

function BurgerMenu({onClose}) {
  return (
    <div className="burger">
      <div className="burger__backdrop">
        <div className="burger__container">
          <button type='button' className="burger__button-close" onClick={() => onClose()}/>
          <div className="burger__menu">
            <NavLink to="/" className={burgerMenuClass} onClick={() => onClose()}>Главная</NavLink>
            <NavLink to="/movies" className={burgerMenuClass} onClick={() => onClose()}>Фильмы</NavLink>
            <NavLink to="/saved-movies" className={burgerMenuClass} onClick={() => onClose()}>Сохранённые фильмы</NavLink>
          </div>
            <Link to='/profile'>
              <button className="burger__button-account">Аккаунт</button>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default BurgerMenu;