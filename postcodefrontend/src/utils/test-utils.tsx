import { QueryClient, QueryClientProvider } from "react-query";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import suburbReducer from '../slices/suburb-slice';
import formReducer from '../slices/form-slice';
import authReducer from '../slices/auth-slice';
import React from "react";

const queryClient = new QueryClient();

export function renderWithProviders(
    ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>
) {
    const store = configureStore({
        reducer: {
            form: formReducer,
            suburb: suburbReducer,
            auth: authReducer
        },
    })

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Provider store={store}>{ui}</Provider>
            </BrowserRouter>
        </QueryClientProvider>
    );
}