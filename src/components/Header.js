import NavBar from "./NavBar"

function Header({currentUser}){
    return(
        <header>
            <h1 className='header'>MovieRater</h1>
            <NavBar />
            {currentUser.username ? <p><b>User: </b>{currentUser.username}</p>: null }
        </header>
    )
}

export default Header