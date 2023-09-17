import "./Movies.css";
import React from 'react';
import { filterMovies } from '../../utils/utils';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList'; 
import Footer from "../Footer/Footer";
import Header from "../Header/Header";


function Movies({ movies, onAllMovies, isLoggedIn}) {

  const [searchQuery, setSearchQuery] = React.useState('');
  const [shortFilms, setShortFilms] = React.useState('off');
  const [filteredMovies, setFilteredMovies] = React.useState([]);

  function handleSearchSubmit(value) {
    setSearchQuery(value);
    localStorage.setItem('searchQuery', value);
    if(!movies.length){
      onAllMovies();
    }
  }

  function handleCheckbox(e) {
    setShortFilms(e.target.value);
	}

  React.useEffect(() => {
    setFilteredMovies(filterMovies(movies, searchQuery, shortFilms));
  }, [searchQuery, movies, shortFilms])

  return (
    <section className="movies">
      <Header isLoggedIn={isLoggedIn}/>
      <SearchForm onSearchClick={handleSearchSubmit} onCheckbox={handleCheckbox} shortFilms={shortFilms} />
      <MoviesCardList list={filteredMovies}/>
      <Footer />
    </section>
  )
}

export default Movies;