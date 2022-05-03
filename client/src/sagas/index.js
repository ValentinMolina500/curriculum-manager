import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects"

import * as types from "../store/actions"
import { setAuthStatus, authError, loginSuccess } from "../store/authSlice"
import { semestersError, semestersSuccess, setSelectedSemester, setSemesterStatus } from "../store/semestersSlice"
import { instructorsError, setInstructorStatus, instructorsSuccess, addInstructor } from "../store/instructorsSlice"
import { coursesError, setCoursesStatus, coursesSuccess } from "../store/coursesSlice"
import { offeringsError, setOfferingStatus, offeringsSuccess } from "../store/offeringsSlice"
import API from "../utils/API"

function* login(action) {
  const { email, password } = action.payload.credentials;
  yield put(setAuthStatus("loading"))
  try {
    const result = yield call(API.login, { email, password });

    yield put(loginSuccess(result.user));

    const callback = action.payload.onLoginSuccess;
    if (callback) {
      callback();
    }


    /* Fetch user sessions */
    yield put({ type: types.FETCH_SEMESTERS });
    yield put({ type: types.FETCH_INSTRUCTORS });
    // yield put({ type: types.FETCH_OFFERINGS });
  } catch (error) {
    yield put(authError(error));
  }
}

function* watchLogin() {
  yield takeLatest(types.LOGIN_REQUEST, login)
}

function* fetchSemesters(action) {
  yield put(setSemesterStatus("loading"));

  try {
    const result = yield call(API.getSemesters);

    yield put(semestersSuccess(result));
  } catch (error) {
    yield put(semestersError(error));
  }
}

function* watchFetchSemesters() {
  yield takeLatest(types.FETCH_SEMESTERS, fetchSemesters);
}

function* fetchInstructors(action) {
  yield put(setInstructorStatus("loading"));

  try {
    const result = yield call(API.getInstructors);

    yield put(instructorsSuccess(result));
  } catch (error) {
    yield put(instructorsError(error));
  }
}

function* watchFetchInstructors() {
  yield takeLatest(types.FETCH_INSTRUCTORS, fetchInstructors);
}

function* fetchOfferings(action) {
  const { semesterId } = action.payload
  yield put(setOfferingStatus("loading"));
  try {
    const result = yield call(API.getAllOfferings);


    // Add formatted start/end time out of 2400
    const formattedResult = result.map(offering => {
      const rawStartTime = new Date(offering.OffStartTime);
      const rawEndTime = new Date(offering.OffEndTime);

      const startTime = rawStartTime.getUTCHours() * 60 + rawStartTime.getUTCMinutes();
      const endTime = rawEndTime.getUTCHours() * 60 + rawEndTime.getUTCMinutes();
      const className = `${offering.CrsSubject} ${offering.CrsNumber}`;

      return {
        ...offering,
        startTime,
        endTime,
        className
      }
    });

    console.log("THIS IS FORMATTED RESULTS: ", formattedResult);


    yield put(offeringsSuccess({
      semesterId,
      offerings: formattedResult
    }));
  } catch (error) {
    yield put(offeringsError(error));
  }
}

function* watchFetchOfferings() {
  yield takeLatest(types.FETCH_OFFERINGS, fetchOfferings);
}

function* selectSemester(action) {
  const semesterId = action.payload;

  yield put(setSelectedSemester(semesterId));

  /* Fetch course info */
  yield put(setCoursesStatus("loading"));

  /* Fetch instructor info */
  yield put(setInstructorStatus("loading"));

  /* Fetch offering info */
  yield put(setOfferingStatus("loading"));

  try {
    const courses = yield call(API.getAllCourses);
    console.log("COURSES", courses);
    yield put(coursesSuccess({
      semesterId,
      courses
    }));

    const instructors = yield call(API.getAllInstructors);
    console.log("INSTRUCTORS", instructors);
    yield put(instructorsSuccess({
      semesterId,
      instructors
    }));
    
    yield put({ 
      type: types.FETCH_OFFERINGS,
      payload: {
        semesterId
      }
    })
    // const offerings = yield call(API.getAllOfferings);
    // console.log("OFFERINGS", offerings);
    // yield put(offeringsSuccess({
    //   semesterId,
    //   offerings
    // }));

  } catch (error) {
    console.error(error);
    yield put(coursesError(error));
    yield put(instructorsError(error));
    yield put(offeringsError(error));
  }
}
function* watchSelectSemester() {
  yield takeLatest(types.SELECT_SEMESTER, selectSemester);
}

function* addNewInstructor(action) {
  const { newInstructor, onSuccess } = action.payload;

  yield put(setInstructorStatus('loading'));

  try {
    const result = yield call(API.addNewInstructor, newInstructor);
    // yield put(addInstructor(result));
    yield put({ type: types.FETCH_INSTRUCTORS });

    if (onSuccess) {
      onSuccess();
    }

  } catch (error) {
    console.error("ERROR in addnewInstructor: ", error);
    yield put(instructorsError(error));
  }
}

function* watchAddNewInstructor() {
  yield takeLatest(types.ADD_INSTRUCTOR, addNewInstructor);
}


export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchFetchSemesters(),
    watchFetchInstructors(),
    watchFetchOfferings(),
    watchSelectSemester(),
    watchAddNewInstructor()
  ])
}
