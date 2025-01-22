
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
       videoCount:0,
       videos:[]
}

const videoslice = createSlice({
    name :'video',
    initialState,
    reducers:{
        addToSaveList:(state,action)=>{
            state.videos.push(action.payload)
            state.videoCount=state.videos.length;
        }
    }
})

export const {addToSaveList}=videoslice.actions;
export default videoslice.reducer;