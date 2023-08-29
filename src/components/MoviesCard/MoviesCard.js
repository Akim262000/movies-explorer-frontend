import "./MoviesCard.css"

function MoviesCard(props) {
  return (
    <section className="movies-card">
      <div className="movies-card__container">
        <img className="movies-card-image" src={props.card.image} alt="Фильм"></img>
        <div className="movies-card__info">
            <h3 className="movies-card__title">{props.card.nameRu}</h3>
            <p className="movies-card__duration">1ч 17м</p>
        </div>
        <button className={`movies-card__button 
        ${props.savedPage ? 'movies-card__button-delete' : 'movies-card__button-save'}
        ${props.card.owner === 1 && !props.savedPage ? 'movies-card__button-save_active' : null}`} type="button">Сохранить</button>
      </div>
    </section>
  )
}

export default MoviesCard;