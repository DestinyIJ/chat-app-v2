import { combineReducers } from "@reduxjs/toolkit"
import { persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"

// reducers
import appReducer from "./app/app.reducer"
import authReducer from "./auth/auth.reducer"
import apiReducer from "./api/api.reducer"
import userReducer from "./user/user.reducer"
import chatReducer from "./chat/chat.reducer"

const persistConfig = {
    key: 'root',
    storage,
    keyPrefix: "redux-",
    // whitelist: [],
    // blacklist: []
}

const rootReducer = combineReducers ({
   app: appReducer,
   auth: authReducer,
   api: apiReducer,
   user: userReducer,
   chat: chatReducer
})

export default persistReducer(persistConfig, rootReducer)