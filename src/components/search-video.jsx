import axios from "axios";
import { useFormik } from "formik"
import { useState } from "react";


export function SearchVideo(){
  const[video,setvideo]=useState([{videoId:0, title:'', url:'', description:'', likes:0, dislikes:0, categoryId:0}])

    const formik = useFormik({
        initialValues: {
            search: '',
        },onSubmit:(value)=>{
            axios.get(`http://localhost:8082/VideoLibraryProject/video-api/dynimic/${value.search}`)
            .then(response =>{
                setvideo(response.data)
            })
            
            }
    })

    return(
        <div>
            <h1 className="justify-content-center d-flex">Search Video</h1>
            <div className="d-flex justify-content-center mt-4">
                <form onSubmit={formik.handleSubmit}>
                 <div className="bi bi-search"><input type="search" name="search" placeholder="Search Video"  onChange={formik.handleChange}/>
                 <button type="submit" className="bi bi-search btn btn-primary mx-2">Search</button></div>
                </form>
            </div>
            <main>
                {
                    video.map(video =>
                    <div key="video.videoId" className="card m-2 p-2" style={{width:'250'}}>
                        <div className="card-header" style={{height:'200px'}}>
                    <iframe src={video.url} height="200" width="100%"></iframe>
                        </div>
                        <div className="card-body">
                         {video.title}  
                        </div>
                        <div className="card-footer">
                        <button className="bi bi-hand-thumbs-up btn" >{video.likes}</button>
                        <button className="bi bi-hand-thumbs-down btn">{video.dislikes}</button> 
                        </div>
                    </div> )
                }
            </main>
        </div>
    )
}