import { useOutletContext } from "react-router-dom"
import MovieCard from "./MovieCard"

function MoviesContainer(){

    const {myMovies, setMyMovies}= useOutletContext()
    const movieComponents= myMovies.map(movie => {
        return <MovieCard key= {movie.id} movie={movie} setMyMovies= {setMyMovies} myMovies={myMovies}/>
    })

    return(
        <div className="container">
            {movieComponents}
        </div>
    )
}

export default MoviesContainer