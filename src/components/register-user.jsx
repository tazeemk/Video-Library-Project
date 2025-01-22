import axios from "axios"
import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom"


export function RegisterUser(){

    let navigate =useNavigate()
 

const formik = useFormik({
    initialValues: {
        userName:'',
        password:'',
        email:'',
        number:0
    },
    onSubmit:(value)=>{
 
          axios.post('http://localhost:8082/VideoLibraryProject/video-api/add-user',value)
          .then(
            alert("user added successfully"),
            navigate('/user-login')
          )
        console.log(value)
    }
})


    return(
        <div>
            <div className="align-items-center justify-content-center d-flex p-4" style={{height:'100vh'}}>
            <form className="border border-1 p-3 bg-light text-dark" onSubmit={formik.handleSubmit}>
                <div className="bi bi-person-fill h3"><span className="h3">Registration</span></div>
                <dl>
                 <dt>UserName</dt>
                 <dd><input type="text" name="userName" onChange={formik.handleChange} className="form-control"></input></dd>
                 <dt>Password</dt>
                 <dd><input type="password" name="password" onChange={formik.handleChange} className="form-control"></input></dd>
                <dt>Email</dt>
                <dd><input type="email" name="email" onChange={formik.handleChange} className="form-control"></input></dd>
                <dt>Number</dt>
                <dd><input type="number" name="number" onChange={formik.handleChange} className="form-control"></input></dd>
                </dl>
               <button type="submit" className="btn btn-primary mx-3">Submit</button>
               <Link to="/user-login" className="btn btn-warning">Return to User Login</Link>
            </form>
        </div>
        </div>
    )
}