import { useOutletContext } from "react-router-dom"
import MovieCard from "./MovieCard"

function MoviesContainer(){

    const {userMovies, setMyMovies, imdbObj, currentUser}= useOutletContext()
    const movieComponents= userMovies.map(movie => {
        return <MovieCard key= {movie.id} movie={movie} setMyMovies= {setMyMovies} imdbObj={imdbObj} currentUser={currentUser}/>
    })

    return(
        <div>
            {currentUser.username ? <div className='container'> {movieComponents} </div> : <h2>Please login to see your movies!</h2>}
        </div>
    )
}

export default MoviesContainer