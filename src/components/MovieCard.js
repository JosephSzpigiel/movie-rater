import { useState } from "react"

function MovieCard({imdbObj, movie, setMyMovies, currentUser}){

    const [showDetails, setShowDetails] = useState(false)
    const [movieDetails, setMovieDetails] = useState(movie)
    const {Poster, Title, Year, imdbID} = movie

    const userRating = `rating_${currentUser.username}`
    const userComment= `comment_${currentUser.username}`
    

    function clickHandler(e){
        if(movieDetails.Plot){
            setShowDetails(current => !current)
        }else{
            fetch(`https://www.omdbapi.com/?i=${imdbID}&type=movie&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(r => r.json())
            .then(movie => {
                setMovieDetails({...movie, [userRating]:'', [userComment]:''})
                setShowDetails(current => !current)
        })
    }}

    function submitHandler(e){
        e.preventDefault()
        if (imdbID in imdbObj) {
            fetch(`http://localhost:3000/Movies/${imdbObj[imdbID]}`, {
                method: 'PATCH',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(
                    {
                        [userRating] : movieDetails[userRating], 
                        [userComment] : movieDetails[userComment]
                    }
                ) 
            })
            .then(r => r.json())
            .then(movie => {
                setMyMovies(movies => {
                    return (movies.map((arrayMovie) => {
                        if (arrayMovie.id === movie.id) {
                            return{ ...arrayMovie, [userRating]: movie[userRating], [userComment]: movie[userComment]}
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
            return {...curr, [userRating] :e.target.value}
        })
    }

    function handleRemove(e) {
        fetch(`http://localhost:3000/Movies/${movie.id}`, {
            method: 'PATCH',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({[userRating] : ''})
        })
        .then(r => r.json())
        .then(movie => {
            setMyMovies(movies => {
                return (movies.map((arrayMovie) => {
                    if (arrayMovie.id === movie.id) {
                        return{ ...arrayMovie, [userRating]: ''}
                    } else {
                        return arrayMovie
                    }
                }))
            })
        }) 
    }

    function handleComment(e) {
        setMovieDetails(current => {
            return {...current, [userComment] : e.target.value}
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
                            <input required name ='rating' type="number" min={1} max={100} value={movieDetails[userRating]} onChange={ratingHandler}></input>
                            <textarea name='comment' type= "text" value={movieDetails[userComment]} onChange={handleComment}></textarea>
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