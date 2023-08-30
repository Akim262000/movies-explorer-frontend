import "./SavedMovies.css"
import SearchMovie from '../SearchForm/SearchForm'
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({list}) {

  return (
    <section className="saved-movies">
      <SearchMovie />
      <MoviesCardList list={list} savedMoviesPage={true}/>
    </section>
  )
}

export default SavedMovies;