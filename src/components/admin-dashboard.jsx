import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function AdminDashboard(){
const[video,setvideo]=useState([{videoId:0,title:'',url:'',description:'',likes:'',dislikes:'',categoryId:0}])

  function LoadVideo(){
    axios.get('http://localhost:8082/VideoLibraryProject/video-api/get-video')
     .then(response => {
        setvideo(response.data)
     })  
}

 useEffect(()=>{
    LoadVideo()
 },[])
    return(
        <div>
            <h1 className="text-center">Admin DashBoard</h1>
        <Link to="/add-video" className="bi bi-camera-video-fill btn btn-light">Add New</Link>
       <table className="table table-hover">
        <thead>
         <th>Title</th>
         <th>Preview</th>
        <th>Actions</th>
        </thead>
        <tbody>
            {
           video.map(data=>
            <tr>
            <td>{data.title}</td>
            <td><iframe width="400" height="150" src={data.url}></iframe></td>
            <td>
             <Link to={`/editVideo/${data.videoId}`} className="btn btn-success m-3">Edit</Link>
            <Link to={`/deleteVideo/${data.videoId}`} className="btn btn-danger">Delete</Link>
            </td>
            <td></td>
            </tr>
           )
            }
        </tbody>
        </table> 
        </div>
    )
}