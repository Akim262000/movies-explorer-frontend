import React from "react";
import "./SearchForm.css";

function SearchForm(props) {

  const [value, setValue] = React.useState('');
	
	function handleChangeValue(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSearchClick(value);
  } 

  React.useEffect(() => {
    const input = localStorage.getItem('searchQuery');
    if(input){
      setValue(input);
    }
  }, [])

  return (
    <div className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit}>
        <div className="search-form__search-container">
        <input className="search-form__input" type="text" placeholder="Фильм" value={value} onChange={handleChangeValue} required></input>
        <button className="search-form__button"></button>
        </div>
         <div className="search-form__filter-container">
          <label className={`search-form__filter
          ${props.shortFilms === 'on' ? 'search-form__filter_active' : null}`}>
            <input
              className="search-form__radio search-form__radio_off"
              type="radio"
              name="shortFilms"
              value="off"
              checked={props.shortFilms === "off" ? true : false}
              onChange={props.onCheckbox}
            ></input>
            <input
              className="search-form__radio search-form__radio_on"
              type="radio"
              name="shortFilms"
              value="on"
              checked={props.shortFilms === "on" ? true : false}
              onChange={props.onCheckbox}
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
