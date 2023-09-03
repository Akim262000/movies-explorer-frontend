import { NavLink } from "react-router-dom";
import './BurgerMenu.css'

function BurgerMenu({onClose}) {
  return (
    <div className="burger">
      <div className="burger__backdrop">
        <div className="burger__container">
          <button type='button' className="burger__button-close" onClick={() => onClose()}/>
          <div className="burger__menu">
            <NavLink to="/" activeClassName="burger__menu__link_active" className="burger__menu__link">Главная</NavLink>
            <NavLink to="/movies" activeClassName="burger__menu__link_active" className="burger__menu__link">Фильмы</NavLink>
            <NavLink to="/saved-movies" activeClassName="burger__menu__link_active" className="burger__menu__link">Сохранённые фильмы</NavLink>
          </div>
            <NavLink to='/profile'>
              <button className="burger__button-account">Аккаунт</button>
            </NavLink>
        </div>
      </div>
    </div>
  )
}

export default BurgerMenu;