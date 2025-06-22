import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "../utils/feedSlice";
import connectionReducer from "../utils/connectionSlice"

const appStore = configureStore({
    reducer :{
        user: userReducer , 
        feed: feedReducer,
        connections : connectionReducer
    }
});

export default appStore;
