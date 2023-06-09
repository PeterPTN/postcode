import { createSlice } from "@reduxjs/toolkit/";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        jwtExpirationDate: null,
    },
    reducers: {
        setJwtExpirationDate(state, action) {
            state.jwtExpirationDate = action.payload;
        },
    }
})

export const { setJwtExpirationDate } = authSlice.actions;
export default authSlice.reducer;