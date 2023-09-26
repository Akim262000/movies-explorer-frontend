import React from "react";
import "./SearchForm.css";
import { useFormWithValidation } from "../../hooks/formWithValidation";

function SearchForm({ onSearchClick, savedMoviesPage, shortFilms, onCheckbox }) {
  const { values: query, setValues: setQuery, isValid, setIsValid, isLoading, setIsLoading } = useFormWithValidation("", true);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!query) {
      setIsValid(false);
    } else {
      setIsLoading(true);
      await onSearchClick(query);
      setIsLoading(false);
    }
  }

  // ---ЭФФЕКТЫ---
  React.useEffect(() => {
    if (!savedMoviesPage) {
      const input = localStorage.getItem("searchQuery");
      if (input) {
        setQuery(input);
        setIsValid(true);
      }
    }
  }, [savedMoviesPage, setQuery, setIsValid]);

  return (
    <div className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit} noValidate={true}>
        <div className="search-form__search-container">
          <input
            className="search-form__input"
            type="text"
            placeholder="Фильм"
            name="query"
            value={query || ""}
            disabled={isLoading}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsValid(true);
            }}
            required
          ></input>
          <span className="search-form__error">{isValid ? "Нужно ввести ключевое слово" : ""}</span>
          <button type="submit" className="search-form__button" disabled={isLoading}></button>
        </div>
        <div className="search-form__filter-container">
          <label
            className={`search-form__filter
          ${shortFilms === "on" ? "search-form__filter_active" : null}`}
          >
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
