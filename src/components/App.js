import '../App.css';
import { useState } from 'react';

import Header from './Header';
import SearchContainer from './SearchContainer';
import MoviesContainer from './MoviesContainer';


function App() {
  const [myMovies, setMyMovies] = useState([])
  return (
    <div className="App">
      <Header />
      <SearchContainer setMyMovies={setMyMovies}/>
      <MoviesContainer myMovies={myMovies}/>
    </div>
  );
}

export default App;
