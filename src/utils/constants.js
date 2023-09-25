const SUCCESSFUL_CODE = 200;


const movieDuration = (mins) => {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  return `${hours}ч ${minutes}м`;
}


export {
  SUCCESSFUL_CODE,
  movieDuration,
};