import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";


export function EditVideo(){


    const [videos, setVideos] = useState([{videoId:0, title:'', url:'', description:'', likes:0, dislikes:0, categoryId:0}])
    const [categories, setCategories] = useState([{categoryId:0, categoryName:''}]);

    let params = useParams();
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {videoId:videos?videos.videoId:0,title:videos?videos.title:'', url:videos?videos.url:'', description:videos?videos.description:'', likes:videos?videos.likes:'', dislikes:videos?videos.dislikes:'', categoryId:videos?videos.categoryId:0},
        onSubmit: (video)=>{
           axios.put(`http://localhost:8082/VideoLibraryProject/video-api/modify`, video)
           .then(()=>{
              alert('Video Updated Successfully..');
              navigate('/adminDashboard');
           })
        },
        enableReinitialize: true
    })

    function LoadVideo(){
        axios.get(`http://localhost:8082/VideoLibraryProject/video-api/video-id/${params.id}`)
        .then(response=>{
            setVideos(response.data);
        })
    }
    function LoadCategories(){
        axios.get('http://localhost:8082/VideoLibraryProject/video-api/get-category')
        .then(response=>{
            response.data.unshift({CategoryId:'-1', CategoryName:'Select Category'});
            setCategories(response.data);
        })
    }

    useEffect(()=>{
        LoadVideo();
        LoadCategories();
    },[])

   

    return(
        <div>
            <h4 className="text-warning">Edit Video</h4>
            <form onSubmit={formik.handleSubmit}>
            <dl className="row">
                    <dt className="col-3">Video Id</dt>
                    <dd className="col-9"><input type="number" name="videoId" onChange={formik.handleChange} value={formik.values.videoId} readOnly></input></dd>
                    <dt className="col-3">Title</dt>
                    <dd className="col-9"><input  type="text" onChange={formik.handleChange} value={formik.values.title} name="title" /></dd>
                    <dt className="col-3">URL</dt>
                    <dd className="col-9"><input  type="text" onChange={formik.handleChange} value={formik.values.url} name="url" /></dd>
                    <dt className="col-3">Description</dt>
                    <dd className="col-9"><textarea  rows="4" onChange={formik.handleChange} value={formik.values.description} cols="40" name="description"></textarea></dd>
                     <dt className="col-3">Likes</dt>
                    <dd className="col-9"><input  type="number" onChange={formik.handleChange} value={formik.values.likes} name="likes" /></dd>
                    <dt className="col-3">Dislikes</dt>
                    <dd className="col-9"><input  type="number" onChange={formik.handleChange} value={formik.values.dislikes} name="dislikes" /></dd>
                    <dt className="col-3">Category</dt>
                    <dd className="col-9">
                        <select name="categoryId" onChange={formik.handleChange} value={formik.values.categoryId}>
                            {
                                categories.map(category=><option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>)
                            }
                        </select>
                    </dd>
                </dl>
                <button className="btn btn-success">Save</button>
                <Link to="/admin-dashboard" className="btn btn-warning ms-2">Cancel</Link>
            </form>
        </div>
    )
}