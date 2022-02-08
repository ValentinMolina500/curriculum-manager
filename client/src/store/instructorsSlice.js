import { createSlice } from "@reduxjs/toolkit"

export const instructorsSlice = createSlice({
  name: "instructor",
  initialState: {
    instructors: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    instructorsSuccess: (state, action) => {
      state.instructors = action.payload;
      state.status =  'success';
    },
    instructorsError: (state, action) => {
      state.status = 'error';
    },
    setInstructorStatus: (state, action) => {
      state.status = action.payload;
    }
  }
})

export const { instructorsSuccess, instructorsError, setInstructorStatus } = instructorsSlice.actions;

export const selectInstructors = (state) => state.instructors.instructors;
export const selectInstructorsById = (state, id) => state.instructors.instructors.find((instructor) => instructor.id === id);

export default instructorsSlice.reducer;