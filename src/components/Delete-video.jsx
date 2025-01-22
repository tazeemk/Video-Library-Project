import axios from "axios"
import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useState } from "react"


export function DeleteVideo(){
 const[video,setVideo]=useState([{title:'',url:'',description:'',likes:'',dislikes:''}])
 let params = useParams();
 let navigate =useNavigate();
 function LoadFunction(){
    axios.get( `http://localhost:8082/VideoLibraryProject/video-api/video-id/${params.id}`)
    .then(values=>{
        setVideo(values.data)
    })
 }
 useEffect(()=>{
    LoadFunction();
 },[])
  
function HandleDeleteClick(){
    axios.delete(`http://localhost:8082/VideoLibraryProject/video-api/delete-video/${params.id}`)
     alert("Video Deleted Successfully")
     navigate('/adminDashboard')
   }

    return(
        <div>
            <table className="table table-hover">
            <thead >
            <th>title</th>
            <th>Preview</th>
            <th>Delete</th>
            </thead>
            <tbody>
                {
                
                    <tr>
                        <td>{video.title}</td>
                        <td><iframe width="500" height="250" src={video.url}></iframe></td>
                       <td>
                        <button className="btn btn-danger mx-3" onClick={HandleDeleteClick} >Yes</button>
                        <Link to="/adminDashBoard" className="btn btn-success"> No</Link>
                       </td>
                    </tr>
                 
                }
            </tbody>
            </table>
        </div>
    )
  }