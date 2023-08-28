import "./MoviesCard.css"
import film1 from '../../images/film1.jpg';

function MoviesCard() {
  return (
    <section className="movies-card">
      <div className="movies-card__container">
        <img className="movies-card-image" src={film1}></img>
        <div className="movies-card__info">
            <h3 className="movies-card__title">fdsmfdsf</h3>
            <p className="movies-card__duration">1.20</p>
        </div>
        <button></button>
      </div>
    </section>
  )
}

export default MoviesCard;