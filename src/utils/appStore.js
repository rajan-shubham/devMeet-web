import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connnectionsReducer from "./connectionsSlice";
import requestsReducer from "./requestsSlice";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connections: connnectionsReducer,
        requests: requestsReducer,
    },
});

export default appStore;