import "./SavedMovies.css"
import SearchMovie from '../SearchForm/SearchForm'
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function SavedMovies({list, isLoggedIn}) {

  return (
    <section className="saved-movies">
      <Header isLoggedIn={isLoggedIn} />
      <SearchMovie />
      <MoviesCardList list={list} savedMoviesPage={true}/>
      <Footer savedMoviesPage={true}/>
    </section>
  )
}

export default SavedMovies;