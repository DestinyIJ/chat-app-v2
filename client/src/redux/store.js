import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import rootReducer from './rootReducer'
import { persistStore } from "redux-persist"


const middlewares = []

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: false,
            serializableCheck: false,
            immutableCheck: false
        }).concat(...middlewares),
})

export const persistor = persistStore(store)

export const { dispatch } = store
export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector