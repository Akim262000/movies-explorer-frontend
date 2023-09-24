import { checkResponse, BASE_URL } from "./utils";

// export const base_url = 'https://api.movie-may.nomoredomainsicu.ru';

class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._userUrl = `${this._baseUrl}/users/me`;
    this._moviesUrl = `${this._baseUrl}/movies`;
    this._headers = headers;
  }

  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  // headers = {
  //   Accept: "application/json",
  //   "Content-Type": "application/json",
  // };

  //метод получения информации о пользователе с сервера
  getUserData() {
    return fetch(this._userUrl, {
      headers: this._headers,
      credentials: "include",
    }).then((res) => checkResponse(res));
  }

  // register(name, email, password) {
  //   return fetch(`${this._baseUrl}/signup`, {
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name,
  //       email,
  //       password,
  //     }),
  //   }).then((res) => {
  //     return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  //   });
  // }

  // authorize(email, password) {
  //   return fetch(`${this._baseUrl}/signin`, {
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email,
  //       password,
  //     }),
  //   }).then((res) => {
  //     return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  //   });
  // }

  updateUserInfo(name, email) {
    return fetch(this._userUrl, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
      }),
    }).then((res) => {
      return res.ok ? res.json() : res.json.then((err) => Promise.reject(err));
    });
  }

  // метод получения избранных пользователем фильмов с сервера
  getUsersMovies() {
    return fetch(this._moviesUrl, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    }).then((res) => checkResponse(res));
  }
  
  // метод добавления нового фильма в избранное (создание карточки)
  saveNewMovie({ country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, id }) {
    return fetch(this._moviesUrl, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        country: country || "no country",
        director,
        duration,
        year,
        description,
        image,
        trailer: trailerLink,
        nameRU: nameRU || "no name",
        nameEN: nameEN || "no name",
        thumbnail,
        movieId: id,
      })
    }).then((res) => checkResponse(res));
  }

  //метод удаления карточки пользователя с сервера
  deleteMovie(movieId) {
    return fetch(`${this._moviesUrl}/${movieId}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    }).then((res) => checkResponse(res));
  }
}

const mainApi = new MainApi({
  baseUrl: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
});

export default mainApi;
