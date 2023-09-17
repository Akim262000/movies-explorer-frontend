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

export function filterShortMovies(movies, shortFilms = 'off'){
  return movies.filter((item) => {
    return item.duration < 40;
  })
}