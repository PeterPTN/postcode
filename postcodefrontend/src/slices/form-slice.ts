import { createSlice } from "@reduxjs/toolkit/";

const formSlice = createSlice({
    name: "form",
    initialState: {
        error: null as string[] | null,
        sucess: null as string | null,
    },
    reducers: {
        setError(state, action) {
            state.error = action.payload;
        },
        setSuccess(state, action) {
            state.sucess = action.payload;
        }
    }
})

export const { setError, setSuccess } = formSlice.actions;
export default formSlice.reducer;