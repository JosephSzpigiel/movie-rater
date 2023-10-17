import { useState } from "react"

function LoginForm({userObj, setCurrentUser}){

    const initialValue = {'username': '', 'password': ''}
    const [userInfo, setUserInfo] = useState(initialValue)

    function handleChange(e){
        if (e.target.name === 'username'){
            setUserInfo(current => {
                return {...current, ['username']:e.target.value}
            })
        } else {
            setUserInfo(current => {
                return {...current, ['password']:e.target.value}
            })
        }
    }

    function handleLogin(e){
        e.preventDefault()
        if(userInfo.username in userObj){
            if(userInfo.password === userObj[userInfo.username]){
                setCurrentUser(userInfo)
            }else{
                console.log('Error! Incorrect password!')
            }
        }else{
            console.log('Error! No user with than name!')
        }
    }

    return(
        <form onSubmit={handleLogin}>
            <input required name= 'username' value = {userInfo.username} onChange = {handleChange} placeholder="User Name"/>
            <input required name= 'password' value = {userInfo.password} onChange = {handleChange} type= "password" placeholder="Password"/>
            <input type="submit" value="Submit"/>
        </form>
    )
}

export default LoginForm