import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"

import authReducer from "./authSlice"

import rootSaga from "../sagas"

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    auth: authReducer
  },
  middleware: [sagaMiddleware],
  devTools: true
})

sagaMiddleware.run(rootSaga)

export default store;