import { configureStore } from "@reduxjs/toolkit";
import formReducer from './slices/form-slice';
import suburbReducer from './slices/suburb-slice';
import authReducer from './slices/auth-slice';

export const store = configureStore({
    reducer: {
        form: formReducer,
        suburb: suburbReducer,
        auth: authReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;