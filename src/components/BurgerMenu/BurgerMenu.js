import { Link} from "react-router-dom";
import './BurgerMenu.css'

function BurgerMenu({onClose}) {
  return (
    <div className="burger">
      <div className="burger__backdrop">
        <div className="burger__container">
          <button type='button' className="burger__button-close" onClick={() => onClose()}/>
          <div className="burger__menu">
            <Link to="/" activeClassName="burger__menu__link_active" className="burger__menu__link">Главная</Link>
            <Link to="/movies" activeClassName="burger__menu__link_active" className="burger__menu__link">Фильмы</Link>
            <Link to="/saved-movies" activeClassName="burger__menu__link_active" className="burger__menu__link">Сохранённые фильмы</Link>
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