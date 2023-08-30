import "./Movies.css";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList'; 
import Footer from "../Footer/Footer";

function Movies({list}) {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList list={list}/>
      <Footer />
    </section>
  )
}

export default Movies;