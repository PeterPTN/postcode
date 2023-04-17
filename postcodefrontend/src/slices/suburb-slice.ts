import { createSlice } from "@reduxjs/toolkit";
import SuburbInformationView from "../types/SuburbInformationView";
import SuburbEntity from "../types/SuburbEntity";

const suburbSlice = createSlice({
    name: "suburb",
    initialState: {
        suburbs: [] as SuburbEntity[],
        suburbViewArray: [] as SuburbInformationView[]
    },
    reducers: {
        setSuburbs(state, action) {
            state.suburbs.splice(0, state.suburbs.length, ...action.payload);
        },
        setSuburbView(state, action) {
            state.suburbViewArray = action.payload;
        },
        setSuburbUpdateForm(state, action) {
            // Target object of index
            const index = state.suburbViewArray.findIndex((suburb) => suburb.id === action.payload);

            // Stay within bounds
            if (index !== -1) {
                state.suburbViewArray[index].updateView = !state.suburbViewArray[index].updateView;
            }
        },
        resetSuburbUpdateForm(state, action) {
            if (action.payload) {
                state.suburbViewArray.forEach(suburb => {
                    suburb.updateView = false;
                });
            }
        }
    }
})

export const { setSuburbs, setSuburbView, setSuburbUpdateForm, resetSuburbUpdateForm } = suburbSlice.actions;
export default suburbSlice.reducer;