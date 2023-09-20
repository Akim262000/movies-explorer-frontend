export const BASE_URL = "http://localhost:4000";

// export const base_url = 'https://api.movie-may.nomoredomainsicu.ru';

const checkResponse = (response) => {
  return response.ok ? response.json() : Promise.reject(new Error(`Ошибка ${response.status}: ${response.statusText}`));
};

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

//метод получения информации о пользователе с сервера
export const getUserData = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const register = ( name, email, password ) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password,
      })
    })
    .then(res => {
      return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
    })
};

export const authorize = ( email, password ) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
      })
    })
    .then(res => {
      return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
    })
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));
};

export const updateUserInfo = (name, email, token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify({
      name,
      email,
    }),
  }).then((res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  });
};

// метод получения избранных пользователем фильмов с сервера
export const getUsersMovies = (token) => {
  return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
// метод добавления нового фильма в избранное (создание карточки)
export const saveNewMovie = ({ token, country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, id }) => {
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
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
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

//метод удаления карточки пользователя с сервера
export const deleteMovie = (token, movieId) => {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: "DELETE",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
