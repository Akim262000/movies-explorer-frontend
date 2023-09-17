import { Routes, Route } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { saveList } from '../../utils/data'
import React from 'react';
import moviesApi from '../../utils/MoviesApi'
import NotFound from '../NotFound/NotFouns';

function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [allMovies, setAllMovies] = React.useState([]);

  function changeMovies(movies) {
    movies.forEach(movie => {
      if(!movie.image) {
        movie.image = "https://i.pinimg.com/originals/95/e7/ec/95e7ec6b98c3cc762bdeb6179b779ca1.jpg";
      } else {
        movie.image = `https://api.nomoreparties.co/${movie.image.url}`;
       }
    });
  }

  function handleGetInitialMovies () {
    moviesApi.getMovies()
      .then((data) => {
        changeMovies(data);
        setAllMovies(data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className='app'> 
      <Routes>
        <Route path="/" element={<Main isLoggedIn={isLoggedIn}/>} />

        <Route path="/movies" element={<Movies isLoggedIn={isLoggedIn} movies={allMovies} onAllMovies={handleGetInitialMovies} />} />

        <Route path="/saved-movies" element={<SavedMovies isLoggedIn={isLoggedIn} list={saveList}/>} />

        <Route path="/profile" element={<Profile isLoggedIn={isLoggedIn} />} />

        <Route path="/signup" element={<Register />} />

        <Route path="/signin" element={<Login />} />

        <Route path="*" element={<NotFound />} />

      </Routes>

    </div>
  );
}

export default App;
