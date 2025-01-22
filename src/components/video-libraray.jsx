import { useState,useEffect } from "react"
import { Link } from "react-router-dom"
import { useFormik } from "formik"
import axios from "axios"

export function RegisterLink(){

    return(
        
            <Link to="/user-register" className="btn btn-warning">Register</Link>
        
    )
}

export function Passwordcomponent(){

    return(
        <div className="input-group">
<input type="text" className="form-control" placeholder="Your password"></input>
   <button className="btn btn-warning">Continue</button>
        </div>
    )
}



export function VideoLibrary(){
    const[view,setView]=useState('')


    const formik =useFormik({
        initialValues:{UserId:'', UserName:'', Password:'', Email:'', Mobile:''}
        ,onSubmit:(user)=>
            axios.get(`http://127.0.0.1:3030/get-users`)
        .then(response=>{
            var data = response.data.find(client=> client.Email===user.Email);
            if(data){
                setView(<Passwordcomponent />);
            } else {
                setView(<RegisterLink />);
            }
        })
     }
    )

    return(
             <div style={{height:'100vh'}} className="d-flex justify-content-center align-items-center">
             <main className='text-center'>
               <h1>Watch Technology Videos</h1>
               <p>Any where any time</p>
               <div className="input-group">
                   <form onSubmit={formik.handleSubmit} className="input-group">
                     <input type="email" onChange={formik.handleChange} name="Email" className="form-control" placeholder="Your email address" />
                    <button type="submit" className="btn btn-danger">Get Started <span className="bi bi-chevron-right"></span> </button>
                   </form>
                   <div className="my-3">
                        {view}
                    </div>
               </div>
              
             </main>
        </div>
    )
}

