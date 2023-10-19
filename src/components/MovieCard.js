import { useState } from "react"

function MovieCard({imdbObj, movie, setMyMovies, currentUser}){

    const [showDetails, setShowDetails] = useState(false)
    const [movieDetails, setMovieDetails] = useState(movie)
    const {Poster, Title, Year, imdbID} = movie
    const [submitted, setSubmitted] = useState(false)

    const userRating = `rating_${currentUser.username}`
    const userComment= `comment_${currentUser.username}`

    function clickHandler(e){
        setSubmitted(false)
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
                setShowDetails(false)
                setSubmitted(true)
            }) 
        } else{
            fetch('http://localhost:4000/Movies', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(movieDetails)
            })
            .then(r => r.json())
            .then(movie => {
                setMyMovies(movies => [...movies, movie])
                setShowDetails(false)
                setSubmitted(true)
            })
        }
    }

    function ratingHandler(e){
        setMovieDetails(curr => {
            return {...curr, [userRating] :e.target.value}
        })
    }

    function handleRemove(e) {
        fetch(`http://localhost:4000/Movies/${movie.id}`, {
            method: 'PATCH',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({[userRating] : '', [userComment]:''})
        })
        .then(r => r.json())
        .then(movie => {
            setMyMovies(movies => {
                return (movies.map((arrayMovie) => {
                    if (arrayMovie.id === movie.id) {
                        return{ ...arrayMovie, [userRating]: '', [userComment]:''}
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
            <h2>{`${Title} (${Year})`}</h2>
            <img className='movie-image' src={Poster} onClick={clickHandler} sizes="auto"></img>
            {movie.id ? (
                <div>
                    <h3>Score: {movie[userRating]}/100</h3>
                </div>): null}
            {submitted ? <p>Submitted!</p>:null}
            {
                showDetails ? (
                    <div>
                        <form onSubmit={submitHandler}>
                            <label htmlFor='rating'>Rating from 1-100:</label>
                            <input required name ='rating' type="number" min={1} max={100} value={movieDetails[userRating]} onChange={ratingHandler}></input>
                            <textarea placeholder='Leave a comment' name='comment' type= "text" value={movieDetails[userComment]} onChange={handleComment}></textarea>
                            <input className='form-submit' type="submit"></input>
                        </form> 
                        <p>Plot: {movieDetails.Plot}</p>
                        {movie.id ? (
                            <div>
                                <button className="join-now" onClick={handleRemove}>Remove</button>
                            </div>): null}
                    </div>
                ) : null
            }
        </div>
    )
}

export default MovieCard