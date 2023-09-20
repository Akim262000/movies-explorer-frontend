export function filterMovies(movies, searchQuery, shortFilms) {
  const moviesByUserQuery =  movies.filter((item) => {
    const movieRu = String(item.nameRU).toLowerCase();
    const movieEn = String(item.nameEN).toLowerCase();
    const userMovie = searchQuery.toLowerCase();
    return (movieRu.indexOf(userMovie) !== -1 || movieEn.indexOf(userMovie) !== -1);
  });

  if(shortFilms === 'on'){
    return filterShortMovies(moviesByUserQuery);
  }
  return moviesByUserQuery;
}

export function filterShortMovies(movies){
  return movies.filter((item) => {
    return item.duration < 40;
  })
}

export function getSavedMovieCard(arr, id) {
  return arr.find((item) => {
    return item.movieId === id;
  })
}

export const checkResponse = (response) => {
  return response.ok
    ? response.json()
    : Promise.reject(
        new Error(`Ошибка ${response.status}: ${response.statusText}`)
      );
};

export const BASE_URL = "http://localhost:4000";

export function changeMovies(movies) {
  movies.forEach(movie => {
    if(!movie.image){
      movie.image = "https://i.pinimg.com/originals/95/e7/ec/95e7ec6b98c3cc762bdeb6179b779ca1.jpg"
    } else {
      movie.image = `https://api.nomoreparties.co${movie.image.url}`
    }
  });
}