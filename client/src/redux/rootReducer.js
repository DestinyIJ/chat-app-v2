import { combineReducers } from "@reduxjs/toolkit"
import { persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"

// reducers
import appReducer from "./app/app.reducer"

const persistConfig = {
    key: 'root',
    storage,
    keyPrefix: "redux-",
    // whitelist: [],
    // blacklist: []
}

const rootReducer = combineReducers ({
   app: appReducer
})

export default persistReducer(persistConfig, rootReducer)