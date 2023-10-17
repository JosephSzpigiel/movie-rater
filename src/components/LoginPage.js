import LoginForm from "./LoginForm"
import CreateUserForm from "./CreateUserForm"
import {useOutletContext} from "react-router-dom"

function LoginPage(){

    const {userObj, setUserObj, currentUser, setCurrentUser} = useOutletContext()

    function handleLogout(e){
        setCurrentUser({})
    }

    return(
        <div>
            {(currentUser.username) ? (
                <div>
                    <h2> Welcome {currentUser.username}!</h2>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )
            : (
                <div>
                    <h2>Login:</h2>
                    <LoginForm userObj={userObj} setUserObj={setUserObj} setCurrentUser={setCurrentUser}/>
                    <h3>If you don't have an account, create a user here:</h3>
                    <CreateUserForm userObj={userObj} setUserObj={setUserObj} setCurrentUser={setCurrentUser}/>
                </div>
            )}
        </div>
    )
}

export default LoginPage