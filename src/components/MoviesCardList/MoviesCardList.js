import MoviesCard from '../MoviesCard/MoviesCard'
import "./MoviesCardList.css"

function MoviesCardList() {
  return (
    <section className="movies-card-list">
      <div className="movies-сard-list__container">
        <MoviesCard />
      </div>
      <button className="movies-card-list__button" type="button" aria-label="Показать ещё">
          Ещё
      </button>
    </section>
  )
}

export default MoviesCardList;