import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { rowsReducer } from "./reducers/rowsReducer";

const rootReducer = combineReducers({
    rows: rowsReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
