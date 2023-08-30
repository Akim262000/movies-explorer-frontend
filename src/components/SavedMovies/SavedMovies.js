import "./SavedMovies.css"
import SearchMovie from '../SearchForm/SearchForm'
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies({list}) {

  return (
    <section className="saved-movies">
      <SearchMovie />
      <MoviesCardList list={list} savedMoviesPage={true}/>
      <Footer />
    </section>
  )
}

export default SavedMovies;