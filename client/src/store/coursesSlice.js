import { createSlice } from "@reduxjs/toolkit"

export const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    courses: {
      "8aa25ed4-5e8f-41d9-a70a-b1b0f68dad2e": []
    },
    status: 'idle',
    error: null,
  },
  reducers: {
    coursesSuccess: (state, action) => {
      const { semesterId, courses } = action.payload;

      state.courses[semesterId] = courses;
      state.status =  'success';
    },
    coursesError: (state, action) => {
      state.status = 'error';
    },
    setCoursesStatus: (state, action) => {
      state.status = action.payload;
    }
  }
})

export const { coursesSuccess, coursesError, setCoursesStatus } = coursesSlice.actions;

export const selectCoursesById = (state, semesterId) => {

  console.log(state[semesterId])
  return {
    status: state.courses.status,
    courses: state.courses.courses[semesterId] ?? []
  }
}

export default coursesSlice.reducer;