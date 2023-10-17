import { useEffect, useState } from "react"

function MovieCard({imdbObj, movie, setMyMovies}){

    const [showDetails, setShowDetails] = useState(false)
    const [movieDetails, setMovieDetails] = useState(movie)
    const {Poster, Title, Year, imdbID} = movie
    

    function clickHandler(e){
        if(movieDetails.id){
            setShowDetails(current => !current)
        }else{
            fetch(`https://www.omdbapi.com/?i=${imdbID}&type=movie&apikey=c9f1eed`)
            .then(r => r.json())
            .then(movie => {
                setMovieDetails({...movie,"rating":''})
                setShowDetails(current => !current)
        })
    }}

    function submitHandler(e){
        e.preventDefault()
        if (imdbID in imdbObj) {
            fetch(`http://localhost:3000/Movies/${imdbObj[imdbID]}`, {
                method: 'PATCH',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({'rating': movieDetails.rating}) 
            })
            .then(r => r.json())
            .then(movie => {
                setMyMovies(movies => {
                    return (movies.map((arrayMovie) => {
                        if (arrayMovie.id === movie.id) {
                            return{ ...arrayMovie, ['rating']: movie.rating}
                        } else {
                            return arrayMovie
                        }
                    }))
                })
            }) 
        } else{
            fetch('http://localhost:3000/Movies', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(movieDetails)
            })
            .then(r => r.json())
            .then(movie => setMyMovies(movies => [...movies, movie]))
        }
    }

    function ratingHandler(e){
        setMovieDetails(curr => {
            return {...curr, 'rating':e.target.value}
        })
    }

    function handleRemove(e) {
        fetch(`http://localhost:3000/Movies/${movie.id}`, {
            method: 'DELETE'
        })
        .then(r => {
            setMyMovies(current => {
                return current.filter(currMovie => {
                    return currMovie.id !== movie.id
                })
            })
        })
    }

    return(
        <div className="movie-card, card">
            <h2>{Title}</h2>
            <img className='movie-image' src={Poster} onClick={clickHandler} sizes="auto"></img>
            {movie.id ? <button onClick={handleRemove}>Remove</button> : null}
            <p>{Year}</p>
            {
                showDetails ? (
                    <div>
                        <form onSubmit={submitHandler}>
                            <label htmlFor='rating'>Rating from 1-100:</label>
                            <input name ='rating' type="number" min={1} max={100} value={movieDetails.rating} onChange={ratingHandler}></input>
                            <input type="submit"></input>
                        </form> 
                        <p>Plot: {movieDetails.Plot}</p>
                    </div>
                ) : null
            }
        </div>
    )
}

export default MovieCard