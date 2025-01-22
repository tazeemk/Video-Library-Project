import axios from "axios"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { data, useNavigate } from "react-router-dom"

 
 export function AdminLogin(){
  const[cookie,setcookie,removecookie]=useCookies('admin-id')
 const[admin,setadmin]=useState([{aid:0,userName:'',password:'',addr:''}])
let navigate = useNavigate();
 
 const formik=useFormik({
    initialValues:{
        userName:'',
        password:''
     },onSubmit:(values)=>{
        axios.get('http://localhost:8082/VideoLibraryProject/video-api/get')
        .then((response)=>{
        console.log(response.data)
        console.log(values.userName)
            if(response.data[0].userName===values.userName && response.data[0].password===values.password)
       {
                      setcookie('admin-id',values.userName)
                        navigate('/adminDashboard')
                        window.location.reload();

       }else{
                 navigate('/adminError')
       }
       
            })       
    }
 })

    return(
        <div className="container-fluid justify-content-center align-items-center d-flex " style={{height:'100vh'}}>
            <form className=" w-25" onSubmit={formik.handleSubmit}>
            <div className="bi bi-person-circle"> Admin Login</div>
                <dl>
                <h2></h2>
                    <dt>UserName :</dt>
                    <dd><input type="text" className="form-control" name="userName" onChange={formik.handleChange}></input></dd>
                    <dt>Password</dt>
                    <dd><input type="password" className="form-control" name="password" onChange={formik.handleChange}></input></dd>
                </dl>
                <button className="btn btn-primary" type="submit"> Login</button>
            </form>
        </div>
       
    )
 }