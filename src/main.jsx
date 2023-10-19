import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import moviesReducer from "./features/movies.js"

const store = configureStore({
    reducer: {
      movies : moviesReducer
    },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
