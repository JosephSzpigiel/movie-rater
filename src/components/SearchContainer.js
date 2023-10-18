import { useState } from "react"

import MovieCard from "./MovieCard"
import {useOutletContext} from "react-router-dom"

function SearchContainer(){

    const {setMyMovies, imdbObj, results, setResults, searchVal, setSearchVal, currentUser, error, setError} = useOutletContext()
    const [search, setSearch] = useState('')

    function submitHandler(e) {
        e.preventDefault()
        setError('')
        setResults([])

        fetch(`https://www.omdbapi.com/?s=${search}&type=movie&apikey=${process.env.REACT_APP_API_KEY}`)
        .then(r => r.json())
        .then(movies => {
            if(movies.Response === "True"){
                setResults(movies.Search)
            }else{
                setError(movies.Error)
            }
        })
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
                    {(searchVal !== '')? (
                        <div>
                            <h2>Results: {`${searchVal}`}</h2>
                            <div className="container">{movieComponents}</div>
                        </div>
                    ): null
                    }
                    {(error !== '') ? (<div>{error}</div>):  null}
                </div>
                : <h2>Please login to search for movies!</h2>}
        </div>
    )
}

export default SearchContainer