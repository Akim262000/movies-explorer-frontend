import "./Movies.css";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList'; 
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function Movies({list, isLoggedIn}) {
  return (
    <section className="movies">
      <Header isLoggedIn={isLoggedIn}/>
      <SearchForm />
      <MoviesCardList list={list}/>
      <Footer />
    </section>
  )
}

export default Movies;