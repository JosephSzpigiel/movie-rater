
function LoginForm({userObj, setUserObj}){


    return(
        <form>
            <input placeholder="User Name"/>
            <input type= "password" placeholder="Password"/>
            <input type="button" value="Submit"/>
        </form>
    )
}

export default LoginForm