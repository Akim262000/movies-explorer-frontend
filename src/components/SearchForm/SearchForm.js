import React from "react";
import "./SearchForm.css";
import { useFormWithValidation } from "../../hooks/formWithValidation";

function SearchForm({onSearchClick, savedMoviesPage, shortFilms, onCheckbox}) {

  // const [value, setValue] = React.useState('');
	
  const {values, errors, isValid, setValues, handleChange, setIsValid} = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onSearchClick(values.query);
  };

  // ---ЭФФЕКТЫ---
  React.useEffect(() => {
    if (!savedMoviesPage) {
      const input = localStorage.getItem('searchQuery');
      if (input) {
        setValues({query : input});
        setIsValid(true);
      }
    }
  }, [savedMoviesPage, setValues, setIsValid]);

  return (
    <div className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit}>
        <div className="search-form__search-container">
        <input className="search-form__input" type="text" placeholder="Фильм" name="query" value={values.query || ""} onChange={handleChange} required></input>
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
              onChange={onCheckbox}
            ></input>
            <input
              className="search-form__radio search-form__radio_on"
              type="radio"
              name="shortFilms"
              value="on"
              checked={shortFilms === "on" ? true : false}
              onChange={onCheckbox}
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
