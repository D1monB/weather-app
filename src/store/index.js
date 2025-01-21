import { configureStore } from "@reduxjs/toolkit";
import appReducer  from "./slices/appSlice.js";
import uiReducer  from "./slices/uiSlice.js";

const store = configureStore({
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    reducer: {
            app: appReducer,
            ui: uiReducer
        },
    devTools: true
    },
)

export default store