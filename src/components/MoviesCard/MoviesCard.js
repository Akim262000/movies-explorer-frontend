import { movieDuration } from "../../utils/constants";
import "./MoviesCard.css";

function MoviesCard({ card, onLike, onDelete, liked, savedPage }) {
  //обработчик клика по кнопке лайка
  function handleLikeClick() {
    onLike(card);
  }

  //обработчик клика по кнопке удаления/дизлайка
  function handleDeleteClick() {
    onDelete(card);
  }

  return (
    <section className="movies-card">
      <a className="app__link" href={card.trailer || card.trailerLink} target="_blank" rel="noreferrer">
        <img className="movies-card__image" src={`${card.image}`} alt={`Обложка фильма ${card.nameRU}`} />
      </a>
      <div className="movies-card__info">
        <h3 className="movies-card__title">{card.nameRU}</h3>
        <p className="movies-card__duration">{movieDuration(card.duration)}</p>
      </div>
      <button
        className={`movies-card__button
      ${savedPage ? "movies-card__button-delete" : "movies-card__save-delete"}
      ${liked && !savedPage ? "movies-card__button-save_active" : ""}`}
        type="button"
        aria-label="Добавить в избранное"
        onClick={savedPage || liked ? handleDeleteClick : handleLikeClick}
      />
    </section>
  );
}

export default MoviesCard;
