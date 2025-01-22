import axios from "axios"
import { useEffect, useReducer, useState } from "react"
import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addToSaveList } from "./Slicer/video-slicer"
let initialState ={likesCount:0}

function reducer(state,action){
   switch(action.type){
    case'addLike':
    return {likesCount:state.likesCount+1}
    case 'addDislikes':
        return {likesCount:state.likesCount-1}
}
}
export function UserDashboard(){
const[video,setvideo]=useState([{videoId:0, title:'', url:'', description:'', likes:0, dislikes:0, categoryId:0}])
const[cookie,setcookie,removeCookie]=useCookies('userName')
const[category,setcaegory]=useState([{categoryId:0,categoryName:'' }])
const[state,dispatch1] =useReducer(reducer,initialState)
let navigate =useNavigate()
let dispatch =useDispatch()


function HandleSaveClick(video){

    dispatch(addToSaveList(video))

}

function HandleLikeClicks(){
    dispatch1({type: 'addLike'})
}

function LoadVideo(){
    axios.get('http://localhost:8082/VideoLibraryProject/video-api/get-video')
    .then((value)=>{
        setvideo(value.data)
    },[])
    }

 function LoadCategories(){
    axios.get('http://localhost:8082/VideoLibraryProject/video-api/get-category')
    .then((value1)=>{
        value1.data.unshift({categoryId:'-1',categoryName:'Select Category'})
       setcaegory(value1.data)
    })
 }
function HandleSignOut() {
    removeCookie('userName');
         navigate('/')
}

function HandleSubmit(categoryId){
   axios.get(`http://localhost:8082/VideoLibraryProject/video-api/byid/${categoryId}`)
   .then((video)=>{
    setvideo(video.data);
   })
}
useEffect(()=>{
    LoadVideo();
    LoadCategories();
 },[])
    return(
        <div>
            <div className="justify-content-between  d-flex">
            <h3>{cookie['userName']} User Dashboard  </h3>
            <div>
              <div className="bi bi-search"> <Link to="/searchvideo" className="btn btn-primary" >Search Video</Link></div>
            </div>
            <button className="btn btn-danger" onClick={HandleSignOut}>SignOut</button>   
            </div>
            <div className="my-3">
           <form>
            <select name="categoryName" onChange={(e)=>HandleSubmit(e.target.value)}>{
                 category.map(data=><option key={data.categoryId} value={data.categoryId}>{data.categoryName}</option>)
               }
              </select>
              </form>
              </div>
              <main className="d-flex flex-wrap">
                {
                    video.map(video=>
                        <div key={video.videoId} className="card m-2 p-2" style={{width:'250'}}>
                        <div className="card-header" style={{height:'200px'}}>
                    <iframe src={video.url} width="100%" height="200"></iframe>
                        </div>
                        <div className="card-body">
                         {video.title}
                        </div>
                        <div className="card-footer">
                       <button className="bi bi-hand-thumbs-up btn"  onClick={HandleLikeClicks}>Like</button><span>{state.likesCount}</span>
                       <button className="bi bi-hand-thumbs-down btn">{video.dislikes}</button> 
                      <button onClick={()=>HandleSaveClick(video)} className="bi bi-floppy btn btn-success">Watch Later</button>
                        </div>
                        </div>
                    )
                }
              </main>
        </div>
    )
}