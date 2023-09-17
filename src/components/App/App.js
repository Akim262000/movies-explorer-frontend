import { Routes, Route, useNavigate } from 'react-router-dom';
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
import {register, authorize, getContent} from '../../utils/MainApi'

function App() {

  const [authorizationEmail, setAuthorizationEmail] = React.useState('');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isSuccessRegistration, setIsSuccessRegistration] = React.useState(false);
  
  const [currentUser, setCurrentUser] = React.useState({});

  const navigate = useNavigate();

  // Выход 
  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    navigate('/sign-in');
  };

  const handleRegistration = (data) => {
    return register(data)
    .then(() => {
      setIsSuccessRegistration(true);
      navigate('/sign-in');
    })
    .catch((err) => {
      console.log(err);
      setIsSuccessRegistration(false);
    });
  };

  const handleAuthorization = (data) => {
    return authorize(data)
      .then((data) => {
        setIsLoggedIn(true);
        localStorage.setItem('jwt', data.token);
        tokenCheck();
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }
    getContent(jwt)
      .then((data) => {
        setAuthorizationEmail(data.data.email);
        setIsLoggedIn(true);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
      });
  };

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);


  return (
    <CurrentUserContext.Provider value={currentUser}>
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
          element={<ProtectedRoute component={Profile} isLoggedIn={isLoggedIn} onSignOut={handleSignOut} />}
        />

        <Route path="/signup" element={<Register onRegister={handleRegistration} />} />

        <Route path="/signin" element={<Login onLogin={handleAuthorization} />} />

        <Route path="*" element={<NotFound />} />

      </Routes>

    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
