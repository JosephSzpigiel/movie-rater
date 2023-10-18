import { useState } from "react"

import MovieCard from "./MovieCard"
import {useOutletContext} from "react-router-dom"

function SearchContainer(){

    const {setMyMovies, imdbObj, results, setResults, searchVal, setSearchVal, currentUser, error, setError, page, setPage, totalPages, setTotalPages} = useOutletContext()
    const [search, setSearch] = useState('')

    function submitHandler(e) {
        e.preventDefault()
        setError('')
        setResults([])
        setPage(1)
        fetch(`https://www.omdbapi.com/?s=${search}&type=movie&apikey=${process.env.REACT_APP_API_KEY}`)
        .then(r => r.json())
        .then(movies => {
            if(movies.Response === "True"){
                setResults(movies.Search)
                setTotalPages(Math.ceil(movies.totalResults/10))
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

    function handleMore(e){
        fetch(`https://www.omdbapi.com/?s=${searchVal}&type=movie&apikey=${process.env.REACT_APP_API_KEY}&page=${page+1}`)
            .then(r => r.json())
            .then(newMovies => {
                setResults(current => [...current, ...newMovies.Search])
                setPage(current => current + 1)
            })
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
                            {page < totalPages ? <button onClick={handleMore}>See More</button> : <p>No More Results</p>}
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