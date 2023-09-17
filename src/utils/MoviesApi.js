const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';

class MoviesApi {
  constructor({
    moviesUrl,
  }) {
    this._moviesUrl = moviesUrl;
  }

  //получаем все фильмы с сервера
  getMovies() {
    return fetch(this._moviesUrl,
      )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
}

//создаем экземпляр класса
const moviesApi = new MoviesApi({
    moviesUrl: MOVIES_URL,
});

export default moviesApi;