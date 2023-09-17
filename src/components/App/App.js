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
import NotFound from '../NotFound/NotFouns';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  return (
    <CurrentUserContext.Provider>
      <div className='app'> 
      <Routes>
        <Route path="/" element={<Main isLoggedIn={isLoggedIn}/>} />

        <Route
            path="/movies"
            element={<ProtectedRoute component={Movies} isLoggedIn={isLoggedIn} />}
          />

        <Route path="/saved-movies" element={<ProtectedRoute component={SavedMovies} isLoggedIn={isLoggedIn} list={saveList} />} />

        <Route
          path="/profile"
          element={<ProtectedRoute component={Profile} isLoggedIn={isLoggedIn} />}
        />

        <Route path="/signup" element={<Register />} />

        <Route path="/signin" element={<Login />} />

        <Route path="*" element={<NotFound />} />

      </Routes>

    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
