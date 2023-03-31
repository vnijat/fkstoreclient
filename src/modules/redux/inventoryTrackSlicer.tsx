import { createSlice } from "@reduxjs/toolkit";



interface IInvetoryTrackSlicer {


}




const initialState = {


} as IInvetoryTrackSlicer;



const inventoryTrackSlicer = createSlice({
    name: 'inventoryTrackSlicer',
    initialState,
    reducers: {

    }
});

export const {

} = inventoryTrackSlicer.actions;

export default inventoryTrackSlicer.reducer;