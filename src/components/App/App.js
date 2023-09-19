import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { saveList } from "../../utils/data";
import React from "react";
import NotFound from "../NotFound/NotFouns";
import Preloader from '../Preloader/Preloader'
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { register, authorize, getContent, getUsersMovies, getUserData , saveNewMovie, deleteMovie } from "../../utils/MainApi";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isSuccessRegistration, setIsSuccessRegistration] = React.useState(false);

  const [savedMovies, setSavedMovies] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  const navigate = useNavigate();

  // Выход
  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/signin");
  };

  const handleRegistration = (data) => {
    return register(data)
      .then(() => {
        setIsSuccessRegistration(true);
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessRegistration(false);
      });
  };

  const handleAuthorization = (data) => {
    return authorize(data)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        tokenCheck();
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

   // обработчик добавления фильма в избранное
   function handleSaveMovie(movie){
    saveNewMovie(movie)
      .then(newCard => {
        setSavedMovies([newCard, ...savedMovies]);
      })
      .catch(err => console.log(err))
  };

  // обработчик удаления фильма из избранного
  function handleDeleteMovie(movie){
    deleteMovie(movie._id)
      .then(() => {
        const newMoviesList = savedMovies.filter((m) => m._id === movie._id ? false : true);
        setSavedMovies(newMoviesList);
      })
      .catch(err => console.log(err))
  };


  const handleLoggedIn = () => {
    setIsLoggedIn(true);
  }
  
  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    // if (!jwt) {
    //   return;
    // }
    getContent(jwt)
      .then((data) => {
        // setAuthorizationEmail(data.data.email);
        setIsLoggedIn(true);
        setCurrentUser(data);
        navigate("/");
      })
      .catch((err) => console.log(err));
      getUsersMovies(jwt)
        .then((movies) => {
          setSavedMovies(movies)
        })
        .catch((err) => console.log(err));
    };



  // при логине, если получаем пользователя то обновляем стейты
  React.useEffect(() => {
    setIsLoading(true);
    getUserData()
      .then(data => {
        handleLoggedIn();
        setCurrentUser(data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsLoading(false))
  }, [isLoggedIn]);

  // при загрузке страницы получаем данные избранных пользователем фильмов
  React.useEffect(() => {
    if(isLoggedIn){
      getUsersMovies()
      .then((data) => {
        setSavedMovies(data);
        // setIsError(false);
      })
      .catch(err => {
        // setIsError(true);
        console.log(err);
      })
    }
  }, [isLoggedIn]);



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>
          <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />

          <Route path="/movies" element={<ProtectedRoute component={Movies} isLoggedIn={isLoggedIn} savedMoviesList={savedMovies} onLikeClick={handleSaveMovie} onDeleteClick={handleDeleteMovie} />} />

          <Route path="/saved-movies" element={<ProtectedRoute component={SavedMovies} isLoggedIn={isLoggedIn} list={savedMovies} onDeleteClick={handleDeleteMovie}/>} />

          <Route
            path="/profile"
            element={<ProtectedRoute component={Profile} isLoggedIn={isLoggedIn} currentUser={currentUser} onSignOut={handleSignOut} />}
          />

          <Route path="/signup" element={<Register onRegister={handleRegistration} />} />

          <Route path="/signin" element={<Login onLogin={handleAuthorization} />} />

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
