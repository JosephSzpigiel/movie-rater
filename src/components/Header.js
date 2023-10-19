import NavBar from "./NavBar"
import logo from '../assets/logo.png'

function Header({currentUser}){
    return(
        <header>
            <img className = 'logo' src={logo}/>
            <NavBar />
            {currentUser.username ? <p className="user-info"><b>User: </b>{currentUser.username}</p>: null }
        </header>
    )
}

export default Header