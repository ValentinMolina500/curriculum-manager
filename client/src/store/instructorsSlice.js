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
      const { semesterId, instructors } = action.payload;
      
      state.instructors  = instructors;
      state.status =  'success';
    },
    instructorsError: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    },
    setInstructorStatus: (state, action) => {
      state.status = action.payload;
    },
    addInstructor: (state, action) => {
      state.instructors.push(action.payload);
      state.status =  'success';
    }
  }
})

export const { instructorsSuccess, instructorsError, setInstructorStatus, addInstructor } = instructorsSlice.actions;

export const selectInstructorsById = (state, semesterId) => {
  return {
    status: state.instructors.status,
    instructors: state.instructors.instructors
  }
}
export default instructorsSlice.reducer;