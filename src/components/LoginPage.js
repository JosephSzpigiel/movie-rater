import LoginForm from "./LoginForm"
import CreateUserForm from "./CreateUserForm"
import {useOutletContext} from "react-router-dom"

function LoginPage(){

    const {userObj, setUserObj} = useOutletContext()

    return(
        <div>
            <h2>Login:</h2>
            <LoginForm userObj={userObj} setUserObj={setUserObj}/>
            <h3>If you don't have an account, create a user here:</h3>
            <CreateUserForm userObj={userObj} setUserObj={setUserObj}/>
        </div>
    )
}

export default LoginPage