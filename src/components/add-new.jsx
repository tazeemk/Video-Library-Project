import axios from "axios"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export function AddNew(){
 const[category,setcatgory]=useState([{categoryId:0,categoryName:''}])
 let navigate = useNavigate();   
 const formik = useFormik({
        initialValues: {
            title:'',
            url:'',
            description:'',
            likes:'',
            dislikes:'',
            categoryId:''
        },
        onSubmit:(data)=>{
            axios.post('http://localhost:8082/VideoLibraryProject/video-api/add-video',data)
            alert('Successfully added video ')
            navigate('/adminDashboard')
           
        }
    })
   
   function LoadFunction()
   {
         axios.get('http://localhost:8082/VideoLibraryProject/video-api/get-category')
         .then(response => {
            response.data.unshift({categoryId:'-1',categoryName:'Select Category'})
            setcatgory(response.data) 
         })
   }
   useEffect(()=>{
    LoadFunction()
   },[])

    return(
        <div >
        <form onSubmit={formik.handleSubmit}> 
           <h5 className="text-warning">Add New Video</h5>
           <dl className="row">
           <dt className="col-3">Title</dt>
           <dd className="col-9"><input type="text" name="title" onChange={formik.handleChange}></input> </dd>
           <dt className="col-3">URL</dt>
           <dd className="col-9"><input type="text" name="url" onChange={formik.handleChange}></input></dd>
           <dt className="col-3">Description</dt>
           <dd className="col-9"><textarea cols={40} rows={4} type="text" name="description" onChange={formik.handleChange}></textarea></dd>
           <dt className="col-3">Likes</dt>
           <dd className="col-9"><input type="text" name="likes" onChange={formik.handleChange}></input></dd>
           <dt className="col-3">Dislikes</dt>
           <dd className="col-9"><input type="text" name="dislikes" onChange={formik.handleChange}></input></dd>
          <dt className="col-3">Category</dt>
          <dd className="col-9">
            <select name="categoryId" onChange={formik.handleChange}>
                {
                    category.map((category) => <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>)
                }
            </select>
          </dd>
           </dl>
           <button className="btn btn-primary mx-3">Add</button>
           <Link to="/adminDashboard" className="btn btn-warning">Cancel</Link>
        </form>
        </div>
    )
}