import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import { getSavedMovieCard } from "../../utils/utils";
import Preloader from "../Preloader/Preloader";
import { useWindowWidth } from "../../hooks/windowWidth";

function MoviesCardList({ isLoading, list, isEmptyList, onLike, onDelete, savedMovies, savedMoviesPage, isError }) {
  const width = useWindowWidth();
  const [showList, setShowList] = React.useState([]);
  const [cardsShowParams, setCardsShowParams] = React.useState({ sum: 0, more: 0 });
  const [isMount, setIsMount] = React.useState(true);

  React.useEffect(() => {
    if (width > 1367) {
      setCardsShowParams({ sum: 12, more: 4 });
    } else if (width <= 1367 && width > 1027) {
      setCardsShowParams({ sum: 12, more: 3 });
    } else if (width <= 1027 && width > 629) {
      setCardsShowParams({ sum: 8, more: 2 });
    } else if (width <= 629) {
      setCardsShowParams({ sum: 5, more: 2 });
    }
    return () => setIsMount(false);
  }, [width, isMount]);

  React.useEffect(() => {
    if (list.length && !savedMoviesPage) {
      const res = list.filter((item, index) => index < cardsShowParams.sum);
      setShowList(res);
    }
  }, [list, savedMoviesPage, cardsShowParams.sum]);

  // ---ОБРАБОТЧИКИ---
  // обработчик клика по кнопке "Еще"
  function handleClickMoreMovies() {
    const start = showList.length;
    const end = start + cardsShowParams.more;
    const residual = list.length - start;

    if (residual > 0) {
      const newCards = list.slice(start, end);
      setShowList([...showList, ...newCards]);
    }
  }

  // ф-ия создания массива избранных карточек
  function getSavedMoviesPage() {
    return list.map((item) => <MoviesCard key={item._id} card={item} savedPage={savedMoviesPage} onDelete={onDelete} />);
  }

  // ф-ия создания массива стандартных карточек
  function getInitialMoviesPage() {
    return showList.map((item) => {
      const likedMovieCard = getSavedMovieCard(savedMovies, item.id);
      const likedMovieId = likedMovieCard ? likedMovieCard._id : null;
      return (
        <MoviesCard
          key={item.id}
          card={{ ...item, _id: likedMovieId }}
          onLike={onLike}
          onDelete={onDelete}
          liked={likedMovieCard ? true : false}
        />
      );
    });
  }

  return (
    <section className="movies-card-list">
      {isLoading ? (
        <Preloader />
      ) : isEmptyList || isError ? (
        <p className={`movies-card-list__message ${isError && "movies-card-list__message_type_error"}`}>
          {isError
            ? `Во время запроса произошла ошибка. 
              Возможно, проблема с соединением или сервер недоступен.
              Подождите немного и попробуйте ещё раз.`
            : "Ничего не найдено"}
        </p>
      ) : (
        <>
          <div className="movies-сard-list__container">{savedMoviesPage ? getSavedMoviesPage() : getInitialMoviesPage()}</div>
          <button
            className={`movies-card-list__button 
              ${(savedMoviesPage || isEmptyList || showList.length === list.length) && "movies-card-list__button_type_hidden"}`}
            type="button"
            aria-label="Показать ещё"
            onClick={handleClickMoreMovies}
          >
            Ещё
          </button>
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
