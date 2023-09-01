import MoviesCard from '../MoviesCard/MoviesCard'
import "./MoviesCardList.css"

function MoviesCardList(props) {
  return (
    <section className="movies-card-list">
      <div className="movies-сard-list__container">
      {props.list.map((item) => (
          <MoviesCard 
          key={item.movieId}
          card={item}
          savedPage={props.savedMoviesPage}
          />)
        )}
      </div>
      <button className={!props.savedMoviesPage? "movies-card-list__button" : "movies-card-list__button_type_hidden"} type="button" aria-label="Показать ещё">
          Ещё
      </button>
    </section>
  )
}

export default MoviesCardList;