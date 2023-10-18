import { useState } from "react"

function CreateUserForm({userObj, setUserObj, setCurrentUser, setResults, setSearchVal}){

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

    function handleCreate(e){
        e.preventDefault()
        if(userInfo.username in userObj){
            alert('Error! User Already Exists!')
        }else{
            fetch('http://localhost:3000/Users', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(userInfo)
            })
            .then(r=>r.json())
            .then(user => {
                setUserObj(curr => {
                    return {...curr, [user.username]: user.password}
                })
                setCurrentUser(user)
                setSearchVal('')
                setResults([])
            })
            
        }
    }

    return(
        <form onSubmit={handleCreate}>
            <input required name= 'username' value = {userInfo.username} onChange = {handleChange} placeholder="User Name"/>
            <input required name= 'password' value = {userInfo.password} onChange = {handleChange} type= "password" placeholder="Password"/>
            <input type="submit" value="Submit"/>
        </form>
    )
}

export default CreateUserForm