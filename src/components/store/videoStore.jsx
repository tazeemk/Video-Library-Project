import { configureStore } from "@reduxjs/toolkit";
import videoSlicer from "../Slicer/video-slicer"


export default configureStore({
    reducer:{
        store:videoSlicer
    }
})