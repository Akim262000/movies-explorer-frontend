import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header'
import Main from '../Main/Main';
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";

import {arr, saveList} from '../../utils/data'

function App() {
  return (
    <div className='app'> 
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />

        <Route path="/movies" element={<Movies list={arr}/>} />

        <Route path="/saved-movies" element={<SavedMovies list={saveList}/>} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/signup" element={<Register />} />

        <Route path="/signin" element={<Login />} />

        <Route path="*" />

      </Routes>

      <Footer />
    </div>
  );
}

export default App;
