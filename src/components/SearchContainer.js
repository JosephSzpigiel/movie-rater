import { useState } from "react"

import MovieCard from "./MovieCard"
import {useOutletContext} from "react-router-dom"

function SearchContainer(){

    const {setMyMovies, imdbObj, results, setResults, searchVal, setSearchVal, currentUser} = useOutletContext()
    const [search, setSearch] = useState('')

    function submitHandler(e) {
        e.preventDefault()

        fetch(`https://www.omdbapi.com/?s=${search}&type=movie&apikey=${process.env.REACT_APP_API_KEY}`)
        .then(r => r.json())
        .then(movies => setResults(movies.Search))
        setSearchVal(search)
        setSearch('')
    }

    function changeHandler(e) {
        setSearch(e.target.value)
    }

    const movieComponents = results.map((movie) => {
        return <MovieCard key= {movie.imdbID} movie={movie} setMyMovies={setMyMovies} imdbObj={imdbObj} currentUser={currentUser}/>
    })


    return(
        <div>
            {currentUser.username ?  
                <div>
                    <form onSubmit = {submitHandler}>
                        <input placeholder="Search Movie" value={search} onChange={changeHandler}></input>
                        <input type="submit"></input>
                    </form>
                    {(searchVal !== '')? <h2>Results: {`${searchVal}`}</h2> : null}
                    <div className="container">{movieComponents}</div>
                </div>
                : <h2>Please login to search for movies!</h2>}
        </div>
    )
}

export default SearchContainer