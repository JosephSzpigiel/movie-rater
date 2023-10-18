import { useOutletContext } from "react-router-dom"
import {useState} from "react"
import MovieCard from "./MovieCard"

function MoviesContainer(){

    const {userMovies, setMyMovies, imdbObj, currentUser}= useOutletContext()
    const [sort, setSort] = useState('az')

    let sortedMovies = []

    // if(sort === 'az'){
    //     sortedMovies = userMovies.sort((a,b) => a.Title > b.Title ? 1 : -1)
    // }else if(sort === 'za'){
    //     sortedMovies = userMovies.sort((a,b) => a.Title > b.Title ? -1 : 1)
    // }else if(sort === )

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

    const movieComponents= sortedMovies.map(movie => {
        return <MovieCard key= {movie.id} movie={movie} setMyMovies= {setMyMovies} imdbObj={imdbObj} currentUser={currentUser}/>
    })

    function sortHandler(e){
        setSort(e.target.value)
    }

    return(
        <div>
            {currentUser.username ? (
            <div>
                <label htmlFor="sort" >Sort Movies:</label>
                <select name="sort" onChange={sortHandler}>
                    <option value='az'>A-Z</option>
                    <option value='za'>Z-A</option>
                    <option value='highLow'>High to Low</option>
                    <option value='lowHigh'>Low to High</option>
                </select>
                <div className='container'> {movieComponents} </div> 
            </div>)
            : <h2>Please login to see your movies!</h2>}
        </div>
    )
}

export default MoviesContainer