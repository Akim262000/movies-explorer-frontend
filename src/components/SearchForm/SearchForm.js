import React from "react";
import "./SearchForm.css";

function SearchForm() {


  return (
    <div className="search-form">
      <form className="search-form__form">
        <input className="search-form__input" type="text" placeholder="Фильм"></input>
        <button className="search-form__button"></button>
        <div className="search-form__filter-container">
          <label >
            <input
              className="search-form__radio search-form__radio_off"
              type="radio"
              name="shortFilms"
              value="off"
              // checked={shortFilms === "off" ? true : false}
            ></input>
            <input
              className="search-form__radio search-form__radio_on"
              type="radio"
              name="shortFilms"
              value="on"
              // checked={shortFilms === "on" ? true : false}
            ></input>
            <span className="search-form__"></span>
          </label>
          <p className="search-form__filter-name">Короткометражки</p>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
