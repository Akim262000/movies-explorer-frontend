import "./MoviesCard.css"

function MoviesCard(props) {
  return (
    <section className="movies-card">
        <img className="movies-card__image" src={props.card.image} alt={`Обложка фильма ${props.card.nameRu}`}></img>
        <div className="movies-card__info">
            <h3 className="movies-card__title">{props.card.nameRu}</h3>
            <p className="movies-card__duration">1ч 17м</p>
        </div>
        {props.card.owner === 1 && !props.savedPage && <button className="movies-card__button-save" />}
        {props.savedPage ? (
          <button className="movies-card__button-delete" />) 
          : (<button className="movies-card__button">Сохранить</button>)
        }
    </section>
  )
}

export default MoviesCard;