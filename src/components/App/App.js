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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { register, authorize, getContent, updateUserInfo, getSavedMovies, saveMovie, deleteMovie } from "../../utils/MainApi";

function App() {
  const [authorizationEmail, setAuthorizationEmail] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isSuccessRegistration, setIsSuccessRegistration] = React.useState(false);

  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [popupMessage, setPopupMessage] = React.useState("");

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

  /* --------------------- Movie cards' functions --------------------- */

  const handleSaveMovie = (movie) => {
    const jwt = localStorage.getItem("jwt");
    const handledMovie = savedMovies.find((item) => {
      return item.movieId === movie.id;
    });
    const isLiked = Boolean(handledMovie);
    const id = handledMovie ? handledMovie._id : null;
    if (isLiked) {
      deleteMovie(id, jwt)
        .then((card) => {
          const updatedSavedMovies = savedMovies.filter((item) => card._id !== item._id);
          localStorage.setItem("savedMovies", updatedSavedMovies);
          setSavedMovies(updatedSavedMovies);
        })
        .catch((error) => {
          setPopupMessage(error);
          setIsPopupOpen(true);
        })
        // .finally(() => {
        //   setIsLoading(false);
        // });
    } else {
      saveMovie(movie, jwt)
        .then((newSavedMovie) => {
          setSavedMovies((prev) => [...prev, newSavedMovie]);
        })
        .catch((error) => {
          setPopupMessage(error);
          setIsPopupOpen(true);
        });
    }
  };

  const handleDeleteMovie = (movie) => {
    // setIsLoading(true);
    const jwt = localStorage.getItem("jwt");
    deleteMovie(movie._id, jwt)
      .then((card) => {
        const updatedSavedMovies = savedMovies.filter((item) => card._id !== item._id);
        localStorage.setItem("savedMovies", updatedSavedMovies);
        setSavedMovies((prev) => updatedSavedMovies);
      })
      .catch((error) => {
        setPopupMessage(error);
        setIsPopupOpen(true);
      });
    // .finally(() => {
    //   setIsLoading(false);
    // });
  };

  const handleUpdateUser = (newUserInfo) => {
    const jwt = localStorage.getItem("jwt");
    // setIsLoading(true);
    updateUserInfo(newUserInfo, jwt)
      .then((data) => {
        setCurrentUser(data);
        setPopupMessage("Профиль успешно редактирован!");
        setIsPopupOpen(true);
      })
      .catch((error) => {
        setPopupMessage("При обновлении профиля произошла ошибка.");
        setIsPopupOpen(true);
      });
    // .finally(() => {
    //   setIsLoading(false);
    // });
  };

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
      getSavedMovies(jwt)
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
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>
          <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />

          <Route path="/movies" element={<ProtectedRoute component={Movies} isLoggedIn={isLoggedIn}  savedMovies={savedMovies} onSave={handleSaveMovie} onDelete={handleDeleteMovie} />} />

          <Route path="/saved-movies" element={<ProtectedRoute component={SavedMovies} isLoggedIn={isLoggedIn} list={saveList} savedMovies={savedMovies} onDelete={handleDeleteMovie} />} />

          <Route
            path="/profile"
            element={<ProtectedRoute component={Profile} isLoggedIn={isLoggedIn} currentUser={currentUser} onSignOut={handleSignOut}  onUpdateUser={handleUpdateUser}/>}
          />

          <Route path="/signup" element={<Register onRegister={handleRegistration} />} />

          <Route path="/signin" element={<Login onLogin={handleAuthorization} />} />

          <Route exact path="/movies" element={isLoggedIn ? <Navigate to="/movies" /> : <Navigate to="/" />}></Route>
          <Route exact path="/saved-movies" element={isLoggedIn ? <Navigate to="/saved-movies" /> : <Navigate to="/" />}></Route>
          <Route exact path="/profile" element={isLoggedIn ? <Navigate to="/profile" /> : <Navigate to="/" />}></Route>
          <Route exact path="/signup" element={!isLoggedIn ? <Navigate to="/signup" /> : <Navigate to="/" />}></Route>
          <Route exact path="/signin" element={!isLoggedIn ? <Navigate to="/signin" /> : <Navigate to="/" />}></Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
