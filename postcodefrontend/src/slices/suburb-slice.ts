import { createSlice } from "@reduxjs/toolkit";
import { Suburb } from "../types/Suburb";

const suburbSlice = createSlice({
    name: "suburb",
    initialState: {
        suburbs: [] as Suburb[]
    },
    reducers: {
        setSuburbs(state, action) {
            state.suburbs.splice(0, state.suburbs.length, ...action.payload);
        }
    }
})

export const { setSuburbs } = suburbSlice.actions;
export default suburbSlice.reducer;