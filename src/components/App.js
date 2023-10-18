import '../App.css';
import { useState, useEffect } from 'react';

import Header from './Header';
import {Outlet} from 'react-router-dom'


function App() {
  
  const [currentUser, setCurrentUser] = useState({})
  const [myMovies, setMyMovies] = useState([])
  const [results, setResults] = useState([])
  const [searchVal, setSearchVal] = useState('')
  const [userObj, setUserObj] = useState({})

  const imdbObj= {}
  for (let i=0; i< myMovies.length; i++) {
      imdbObj[myMovies[i].imdbID]= myMovies[i].id
  }

  const userMovies  = myMovies.filter(movie  => {
    if (movie[`rating_${currentUser.username}`] && movie[`rating_${currentUser.username}`] !== ''){
      return true
    }
  })
  

  useEffect(() => {
    fetch('http://localhost:3000/Users')
    .then(r => r.json())
    .then(users => {
      const usersObj ={}
      users.forEach(user => {
        usersObj[user.username] = user.password
      })
      setUserObj(usersObj)
    })
  }, [])

  useEffect(()=> {
    fetch('http://localhost:3000/Movies')
    .then(r => r.json())
    .then(movies => setMyMovies(movies))
  }, [])

  const contextObj = {
    setMyMovies, 
    imdbObj, 
    results, 
    setResults, 
    searchVal, 
    setSearchVal, 
    userObj, 
    setUserObj, 
    setCurrentUser, 
    currentUser,
    userMovies
  }

  return (
    <div className="App">
      <Header currentUser={currentUser}/>
      <Outlet context= {contextObj}/>
    </div>
  );
}

export default App;
