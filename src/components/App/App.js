import { Routes, Route } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import {arr, saveList} from '../../utils/data'
import React from 'react';
import NotFound from '../NotFound/NotFouns';

function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  return (
    <div className='app'> 
      <Routes>
        <Route path="/" element={<Main isLoggedIn={isLoggedIn}/>} />

        <Route path="/movies" element={<Movies isLoggedIn={isLoggedIn} list={arr}/>} />

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
