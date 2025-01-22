import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export function UserLogin(){
const[user,setuser]=useState([{userId:0,userName:'',password:'',email:'',number:0}])
let navigate =useNavigate();
const[cookie,setcookie,removecookie]=useCookies('userName')
function LoadUser(){
    axios.get('http://localhost:8082/VideoLibraryProject/video-api/get-user')
    .then((value)=>{
    setuser(value.data)
    })
}
useEffect(()=>{
    LoadUser();
},[])


const formik = useFormik({

initialValues:{
    userName:'',
    password:''
},
onSubmit:(values)=>{
    if(values.userName===user[0].userName && values.password===user[0].password){
        navigate('/userDashboard')
        setcookie('userName',values.userName)
    }else{
              navigate('/usererror')
    }   
}

})

    return(
        <div >
<div className="d-flex align-items-center justify-content-center p-3  " >
   <form className="p-5 mt-3 " onSubmit={formik.handleSubmit}>
   <div className="bi bi-person-fill h3"><span className="h3">User Login</span></div>
    <dl >
        <dt >Username</dt>
        <dd><input type="text" name="userName" className="form-control" onChange={formik.handleChange}></input></dd>
         <dt>Password</dt>
         <dd><input type="password" name="password" className="form-control" onChange={formik.handleChange}></input></dd>
    </dl>
       <button className="btn btn-primary mx-3" type="submit">Login</button>
        <Link to="/register" className="btn btn-success">New User Registration</Link> 
   </form>
   </div>
      </div>
    )
}