import '../App.css';
import { useState, useEffect } from 'react';

import Header from './Header';
import {Outlet} from 'react-router-dom'


function App() {

  const [myMovies, setMyMovies] = useState([])
  const [results, setResults] = useState([])
  const [searchVal, setSearchVal] = useState('')

  const imdbObj= {}
  for (let i=0; i< myMovies.length; i++) {
      imdbObj[myMovies[i].imdbID]= myMovies[i].id
  }

  useEffect(()=> {
    fetch('http://localhost:3000/Movies')
    .then(r => r.json())
    .then(movies => setMyMovies(movies))
  }, [])

  return (
    <div className="App">
      <Header />
      <Outlet context= {{myMovies, setMyMovies, imdbObj, results, setResults, searchVal, setSearchVal}}/>
    </div>
  );
}

export default App;
