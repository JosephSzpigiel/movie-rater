import '../App.css';
import { useState, useEffect } from 'react';

import Header from './Header';
import SearchContainer from './SearchContainer';
import MoviesContainer from './MoviesContainer';
import {Outlet} from 'react-router-dom'


function App() {

  const [myMovies, setMyMovies] = useState([])

  useEffect(()=> {
    fetch('http://localhost:3000/Movies')
    .then(r => r.json())
    .then(movies => setMyMovies(movies))
  }, [])

  return (
    <div className="App">
      <Header />
      <Outlet context= {{myMovies, setMyMovies}}/>
    </div>
  );
}

export default App;
