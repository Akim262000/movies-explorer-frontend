import { Link, NavLink } from "react-router-dom";
import './BurgerMenu.css'

function BurgerMenu({onClose}) {
  return (
    <div className="burger">
      <div className="burger__backdrop">
        <div className="burger__container">
          <button type='button' className="burger__button-close" onClick={() => onClose()}/>
          <div className="burger__menu">
            <NavLink exact to="/" className="burger__menu__link" activeClassName="burger__menu__link_active" onClick={() => onClose()}>Главная</NavLink>
            <NavLink exact to="/movies" activeClassName="burger__menu__link_active" className="burger__menu__link" onClick={() => onClose()}>Фильмы</NavLink>
            <NavLink exact to="/saved-movies" activeClassName="burger__menu__link_active" className="burger__menu__link" onClick={() => onClose()}>Сохранённые фильмы</NavLink>
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