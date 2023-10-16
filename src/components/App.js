import logo from '../logo.svg';
import '../App.css';

import Header from './Header';
import SearchContainer from './SearchContainer';
import MoviesContainer from './MoviesContainer';


function App() {
  return (
    <div className="App">
      <Header />
      <SearchContainer />
      <MoviesContainer />
    </div>
  );
}

export default App;
