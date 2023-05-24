import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from "redux-persist"
import createSagaMiddleware from "@redux-saga/core";

import rootReducer from './rootReducer'
import rootSaga from "./rootSaga";


const SagaMiddleware = createSagaMiddleware()
const middlewares = [SagaMiddleware]

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false
        }).concat(...middlewares),
})

SagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)

// export const { dispatch } = store
// export const useAppDispatch = () => useDispatch()
// export const useAppSelector = useSelector