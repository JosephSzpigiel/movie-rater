import { useState } from "react"

import MovieCard from "./MovieCard"
import {useOutletContext} from "react-router-dom"

function SearchContainer(){

    const {setMyMovies} = useOutletContext()
    const [search, setSearch] = useState('')
    const [results, setResults] =useState([])

    function submitHandler(e) {
        e.preventDefault()

        fetch(`https://www.omdbapi.com/?s=${search}&type=movie&apikey=c9f1eed`)
        .then(r => r.json())
        .then(movies => setResults(movies.Search))
        setSearch('')
    }

    function changeHandler(e) {
        setSearch(e.target.value)
    }

    const movieComponents = results.map((movie) => {
        return <MovieCard key= {movie.imdbID} movie={movie} setMyMovies={setMyMovies}/>
    })


    return(
        <div>
            <form onSubmit = {submitHandler}>
                <input placeholder="Search Movie" value={search} onChange={changeHandler}></input>
                <input type="submit"></input>
            </form>
            <div className='container'>{movieComponents}</div>
        </div>
    )
}

export default SearchContainer