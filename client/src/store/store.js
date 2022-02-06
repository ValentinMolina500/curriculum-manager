import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"

import authReducer from "./authSlice"
import sessionsReducer from "./sessionsSlice"
import rootSaga from "../sagas"

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    auth: authReducer,
    sessions: sessionsReducer
  },
  middleware: [sagaMiddleware],
  devTools: true
})

sagaMiddleware.run(rootSaga)

export default store;