// import axios from "axios"
import { useAuth0 } from "@auth0/auth0-react";
const Admin = ()=>{
    const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
    // console.log(process.env.REACT_APP_CLIENT_ID)
    const loginMethod = async ()=>{
        loginWithRedirect()
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
        console.log(`Login`)
    }
    const logoutMethod = async () =>{
        logout({returnTo: window.location.origin})
            .then()
            .catch(err => console.log(err))
        console.log(`Logout`)
    }

    return (
        <div className="flex flex-col lg:flex-row h-4/6 justify-evenly items-center">
            <button onClick = {isAuthenticated ? logoutMethod : loginMethod} className="shadow-xl bg-green-400 p-3 text-white w-11/12 lg:w-5/12 hover:bg-green-500 rounded border-l-8 border-red-400">{ isAuthenticated ? `Logout ${user.name}`
             : 'Login'}</button>
        </div>
    )
}

export default Admin