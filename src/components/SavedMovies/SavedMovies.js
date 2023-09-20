import "./SavedMovies.css"
import SearchMovie from '../SearchForm/SearchForm'
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import React from "react";
import { filterMovies } from "../../utils/utils";

function SavedMovies({list, isLoggedIn, onDeleteClick, isError}) {

  // состояния запросов
  const [searchQuery, setSearchQuery] = React.useState('');
  const [shortFilms, setShortFilms] = React.useState('off');
  // состояния фильмов
  const [filteredMovies, setFilteredMovies] = React.useState(list);
  // состояния вспомогательные
  const [isNothingFound, setIsNothingFound] = React.useState(false);

  // ---ОБРАБОТЧИКИ---
  // обработчик отправки формы
  function handleSearchSubmit(value) {
    setSearchQuery(value);
    const resultList = filterMovies(list, searchQuery, shortFilms);
    setFilteredMovies(resultList);
  };

  // обработчик клика по радиокнопке
  function handleShortFilms(e) {
    setShortFilms(e.target.value);
  };

  // ---ЭФФЕКТЫ---
  // по новому запросу фильтруем фильмы
  React.useEffect(() => {
    const arr = filterMovies(list, searchQuery, shortFilms);
    setFilteredMovies(arr);
    if (searchQuery) {
      arr.length === 0 ? setIsNothingFound(true) : setIsNothingFound(false);
    }
  }, [searchQuery, shortFilms, list]);


  return (
    <section className="saved-movies">
      <Header isLoggedIn={isLoggedIn} />
      <SearchMovie 
        onSearchClick={handleSearchSubmit}
        onCheckbox={handleShortFilms}
        shortFilms={shortFilms}
        savedMoviesPage={true}
      />
      <MoviesCardList 
        list={filteredMovies}
        savedMoviesPage={true}
        onDelete={onDeleteClick}
        isEmptyList={isNothingFound}
        isError={isError}  
      />
      <Footer savedMoviesPage={true}/>
    </section>
  )
}

export default SavedMovies;