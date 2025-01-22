import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

export function Signout(){
const[cookie,setcookie,removecookie]=useCookies('admin-id')
let navigate =useNavigate()

function HandleSignOut(){
    removecookie('admin-id')
    navigate('/')
    window.location.reload()
}
    return(
        <div>
      <button onClick={HandleSignOut} className="btn btn-primary">{cookie['admin-id']} SignOut</button>
        </div>
    )
}