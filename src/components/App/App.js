import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import React from "react";
import NotFound from "../NotFound/NotFouns";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import mainApi from "../../utils/MainApi";
import * as auth from "../../utils/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const [savedMovies, setSavedMovies] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState({});

  const [isError, setIsError] = React.useState(false);
  // состояния уведомлений пользователя 
  const [infoMessage, setInfoMessage] = React.useState({
    isShown: false,
    message: '',
    code: 200,
  });

  const navigate = useNavigate();

  // Выход
  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/signin");
  };

  // ---ОБРАБОТЧИКИ---
  // обработчик установки стейта входа/логина пользователя
  function handleLoggedIn() {
    setIsLoggedIn(true);
  };
  const handleRegistration = (name, email, password) => {
    return auth.register(name, email, password)
    .then(data => {
      if(data){
        console.log(data);
        handleAuthorization(email, password);
      } 
    })
    .catch(({ message, statusCode }) => {
      setInfoMessage({
        ...infoMessage,
        isShown: true,
        message,
        code: statusCode,
        type: 'register',
      });
    })
  };

  const handleAuthorization = (email, password) => {
    setIsLoading(true);
    auth.authorize(email, password)
      .then(res => {
        setIsLoggedIn(true);
        localStorage.setItem("jwt", res.token);
        mainApi._headers["Authorization"] = `Bearer ${res.token}`;
        tokenCheck();
        navigate('/movies');
      })
      .catch(({ message, statusCode }) => {
        setInfoMessage({
          ...infoMessage,
          isShown: true,
          message,
          code: statusCode,
          type: 'login',
        });
      })
      .finally(() => setIsLoading(false))
    };

   // обработчик добавления фильма в избранное
   function handleSaveMovie(movie){
    mainApi.saveNewMovie(movie)
      .then(newCard => {
        setSavedMovies([newCard, ...savedMovies]);
      })
      .catch(err => console.log(err))
  };

  // обработчик удаления фильма из избранного
  function handleDeleteMovie(movie){
    mainApi.deleteMovie(movie._id)
      .then(() => {
        const newMoviesList = savedMovies.filter((m) => m._id === movie._id ? false : true);
        setSavedMovies(newMoviesList);
      })
      .catch(err => console.log(err))
  };
  
  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return;
    }
    mainApi.getUserData(jwt)
      .then((data) => {
        // setAuthorizationEmail(data.data.email);
        setIsLoggedIn(true);
        setCurrentUser(data);
        // navigate("/");
      })
      .catch((err) => console.log(err));
      mainApi.getUsersMovies(jwt)
        .then((movies) => {
          setSavedMovies(movies)
        })
        .catch((err) => console.log(err));
    };

    React.useEffect(() => {
      tokenCheck();
    }, []);
  
    React.useEffect(() => {
      if (isLoggedIn) {
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        navigate("/movies");
      }
    }, [isLoggedIn]);

  const handleUpdateUser = (name, email) => {
    mainApi.updateUserInfo(name, email)
    .then(data => {
      setCurrentUser(data);
      setInfoMessage({
        ...infoMessage,
        isShown: true,
        type: 'profile',
      });
    })
    .catch(({ message, statusCode }) => {
      setInfoMessage({
        ...infoMessage,
        isShown: true,
        message,
        code: statusCode,
        type: 'profile',
      });
    })
    };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>
          <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />

          <Route path="/movies" element={<ProtectedRoute component={Movies} isLoggedIn={isLoggedIn} savedMoviesList={savedMovies} onLikeClick={handleSaveMovie} onDeleteClick={handleDeleteMovie} />} />

          <Route path="/saved-movies" element={<ProtectedRoute component={SavedMovies} isLoggedIn={isLoggedIn} list={savedMovies} onDeleteClick={handleDeleteMovie} isError={isError}/>} />

          <Route
            path="/profile"
            element={<ProtectedRoute component={Profile} isLoggedIn={isLoggedIn} onSignOut={handleSignOut} onUpdate={handleUpdateUser} infoMessage={infoMessage}/>}
          />

          <Route path="/signup" element={<Register onRegister={handleRegistration} infoMessage={infoMessage}/>} />

          <Route path="/signin" element={<Login onLogin={handleAuthorization} infoMessage={infoMessage}/>} />

          <Route exact path="/signup" element={!isLoggedIn ? <Navigate to="/signup" /> : <Navigate to="/movies" />}></Route>
          <Route exact path="/signin" element={!isLoggedIn ? <Navigate to="/signin" /> : <Navigate to="/movies" />}></Route>

          {/* <Route exact path="/movies" element={isLoggedIn ? <Navigate to="/movies" /> : <Navigate to="/" />}></Route>
          <Route exact path="/saved-movies" element={isLoggedIn ? <Navigate to="/saved-movies" /> : <Navigate to="/" />}></Route>
          <Route exact path="/profile" element={isLoggedIn ? <Navigate to="/profile" /> : <Navigate to="/" />}></Route>
          <Route exact path="/signup" element={!isLoggedIn ? <Navigate to="/signup" /> : <Navigate to="/" />}></Route>
          <Route exact path="/signin" element={!isLoggedIn ? <Navigate to="/signin" /> : <Navigate to="/" />}></Route> */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
