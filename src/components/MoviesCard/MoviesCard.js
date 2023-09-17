import "./MoviesCard.css"

function MoviesCard(props) {

  function movieDuration(mins) {
    const hours = Math.trunc(mins/60);
    const minutes = mins % 60;
    return `${hours}ч ${minutes}м`;
  };

  return (
    <section className="movies-card">
        <img className="movies-card__image" src={`${props.card.image}`} alt={`Обложка фильма ${props.card.nameRU}`}></img>
        <div className="movies-card__info">
            <h3 className="movies-card__title">{props.card.nameRU}</h3>
            <p className="movies-card__duration">{movieDuration(props.card.duration)}</p>
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