import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"

import authReducer from "./authSlice"
import semestersReducer from "./semestersSlice"
import offeringsReducer from "./offeringsSlice"
import instructorsReducer from "./instructorsSlice"
import coursesReducer from "./coursesSlice"
import rootSaga from "../sagas"

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    auth: authReducer,
    semesters: semestersReducer,
    offerings: offeringsReducer,
    instructors: instructorsReducer,
    courses: coursesReducer

  },
  middleware: [sagaMiddleware],
  devTools: true
})

sagaMiddleware.run(rootSaga)

export default store;