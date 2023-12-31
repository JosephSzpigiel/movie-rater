import { useOutletContext } from "react-router-dom"
import {useState} from "react"
import MovieCard from "./MovieCard"
import SearchSort from "./SearchSort"

function MoviesContainer(){

    const {userMovies, setMyMovies, imdbObj, currentUser}= useOutletContext()
    const [sort, setSort] = useState('az')
    const [filter, setFilter] = useState('')

    let sortedMovies = []

    switch(sort){
        case 'az':
            sortedMovies = userMovies.sort((a,b) => a.Title > b.Title ? 1 : -1)
            break
        case 'za':
            sortedMovies = userMovies.sort((a,b) => a.Title > b.Title ? -1 : 1)
            break
        case 'highLow':
            sortedMovies = userMovies.sort((a,b) => b[`rating_${currentUser.username}`] - a[`rating_${currentUser.username}`])
            break
        case 'lowHigh':
            sortedMovies = userMovies.sort((a,b) => a[`rating_${currentUser.username}`] - b[`rating_${currentUser.username}`])
    }

    let filteredMovies = sortedMovies.filter(movie =>{
        return movie.Title.toLowerCase().includes(filter.toLowerCase())
    })

    const movieComponents= filteredMovies.map(movie => {
        return <MovieCard key= {movie.id} movie={movie} setMyMovies= {setMyMovies} imdbObj={imdbObj} currentUser={currentUser}/>
    })

    function sortHandler(e){
        setSort(e.target.value)
    }

    function searchHandler(e){
        setFilter(e.target.value)
    }

    return(
        <div>
            {currentUser.username ? (
            <div>
                <SearchSort searchHandler ={searchHandler} sortHandler={sortHandler} filter={filter}/>
                <div className='container'> {movieComponents} </div> 
            </div>)
            : <h2>Please login to see your movies!</h2>}
        </div>
    )
}

export default MoviesContainer