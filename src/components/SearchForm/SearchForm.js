import React from "react";
import "./SearchForm.css";

function SearchForm() {

  const [shortFilms, setShortFilms] = React.useState('on');
	
	function changeHandler(event) {
		setShortFilms(event.target.value);
	}

  return (
    <div className="search-form">
      <form className="search-form__form">
        <div className="search-form__search-container">
        <input className="search-form__input" type="text" placeholder="Фильм" required></input>
        <button className="search-form__button"></button>
        </div>
         <div className="search-form__filter-container">
          <label className={`search-form__filter
          ${shortFilms === 'on' ? 'search-form__filter_active' : null}`}>
            <input
              className="search-form__radio search-form__radio_off"
              type="radio"
              name="shortFilms"
              value="off"
              checked={shortFilms === "off" ? true : false}
              onChange={changeHandler}
            ></input>
            <input
              className="search-form__radio search-form__radio_on"
              type="radio"
              name="shortFilms"
              value="on"
              checked={shortFilms === "on" ? true : false}
              onChange={changeHandler}
            ></input>
            <span className="search-form__switch"></span>
          </label>
          <p className="search-form__filter-name">Короткометражки</p>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
