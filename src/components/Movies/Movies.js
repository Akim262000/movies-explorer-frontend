import "./Movies.css";
import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { filterMovies, filterShortMovies, changeMovies } from "../../utils/utils";
import moviesApi from "../../utils/MoviesApi";

function Movies({ isLoggedIn, onLikeClick, savedMoviesList, onDeleteClick }) {
  const forCheckbox = localStorage.getItem("shortFilms") === "on" ? "on" : "off";

  const [searchQuery, setSearchQuery] = React.useState("");
  const [shortFilms, setShortFilms] = React.useState(forCheckbox);

  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const movies = localStorage.getItem("movies") ? JSON.parse(localStorage.getItem("movies")) : [];
  const [allMovies, setAllMovies] = React.useState(movies);

  const [isNothingFound, setIsNothingFound] = React.useState(false);
  const [isMoviesLoaging, setIsMoviesLoaging] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  function handleSetFilteredMovies(movies, query, checkbox) {
    const moviesList = filterMovies(movies, query);
    setFilteredMovies(checkbox === "on" ? filterShortMovies(moviesList) : moviesList);
    // localStorage.setItem("movies", JSON.stringify(moviesList));
  }

  function handleSearchSubmit(value) {
    setIsMoviesLoaging(true);
    setSearchQuery(value);
    localStorage.setItem("searchQuery", value);
    localStorage.setItem("shortFilms", shortFilms);

    if (!allMovies.length) {
      moviesApi
        .getMovies()
        .then((data) => {
          changeMovies(data);
          setAllMovies(data);
          localStorage.setItem("movies", JSON.stringify(data))
          handleSetFilteredMovies(data, value, shortFilms);
        })
        .catch((err) => {
          setIsError(true);
          console.log(err);
        })
        .finally(() => setIsMoviesLoaging(false));
    } else {
      handleSetFilteredMovies(allMovies, value, shortFilms);
      setIsMoviesLoaging(false);
    }
  }

  function handleCheckbox(e) {
    setShortFilms(e.target.value);
    localStorage.setItem("shortFilms", e.target.value);
  }

  // обработчик устновки значения, когда ничего не найдено
  function handleCheckFilteredMovies(arr) {
    arr.length === 0 ? setIsNothingFound(true) : setIsNothingFound(false);
  }

  React.useEffect(() => {
    const arr = JSON.parse(localStorage.getItem("movies"));
    if (arr && !searchQuery) {
      setShortFilms(localStorage.getItem("shortFilms"));
      setFilteredMovies(shortFilms === "on" ? filterShortMovies(arr) : arr);
      handleCheckFilteredMovies(arr);
    }
  }, [shortFilms, searchQuery]);

  React.useEffect(() => {
    if (searchQuery) {
      const arr = filterMovies(allMovies, searchQuery, shortFilms);
      setFilteredMovies(arr);
      handleCheckFilteredMovies(arr);
    }
  }, [searchQuery, shortFilms, allMovies]);

  React.useEffect(() => {
    const query = localStorage.getItem("searchQuery");
    if (query) {
      handleSearchSubmit(query);
    }
  }, []);

  return (
    <section className="movies">
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm onSearchClick={handleSearchSubmit} onCheckbox={handleCheckbox} shortFilms={shortFilms} />
      <MoviesCardList
        list={filteredMovies}
        isLoading={isMoviesLoaging}
        isEmptyList={isNothingFound}
        onLike={onLikeClick}
        onDelete={onDeleteClick}
        savedMovies={savedMoviesList}
        isError={isError}
      />
      <Footer />
    </section>
  );
}

export default Movies;
