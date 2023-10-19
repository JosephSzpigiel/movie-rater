import LoginForm from "./LoginForm"
import CreateUserForm from "./CreateUserForm"
import {useOutletContext} from "react-router-dom"
import { useState } from "react";
import "./LoginPage.css";

function LoginPage(){

    const {userObj, setUserObj, currentUser, setCurrentUser, setResults, setSearchVal, setError} = useOutletContext()
    const [register, setRegister] = useState(false)

    function handleLogout(e){
        setCurrentUser({})
        setSearchVal('')
        setError('')
        setResults([])
    }

    return(
        <div className="main">
            {(currentUser.username) ? (
                <div>
                    <h2> Welcome {currentUser.username}!</h2>
                    <button className='submit-button' onClick={handleLogout}>Logout</button>
                </div>
            )
            : (
                <div>
                    {/* <h2>Login:</h2> */}
                    <LoginForm userObj={userObj} setUserObj={setUserObj} setCurrentUser={setCurrentUser} setResults={setResults} setSearchVal={setSearchVal}/>
                    <button onClick={()=> (setRegister(cur => !cur))} className='input-button'>Create an Account</button>
                    {/* <h3>If you don't have an account, create a user here:</h3> */}
                    {register ? <CreateUserForm userObj={userObj} setUserObj={setUserObj} setCurrentUser={setCurrentUser} setResults={setResults} setSearchVal={setSearchVal}/> :  null}
                </div>
            )}
        </div>
    )
}

export default LoginPage