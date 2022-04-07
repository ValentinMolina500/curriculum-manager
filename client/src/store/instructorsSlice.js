import { createSlice } from "@reduxjs/toolkit"

export const instructorsSlice = createSlice({
  name: "instructor",
  initialState: {
    instructors: {
      "8aa25ed4-5e8f-41d9-a70a-b1b0f68dad2e": []
    },
    status: 'idle',
    error: null,
  },
  reducers: {
    instructorsSuccess: (state, action) => {
      const { semesterId, instructors } = action.payload;
      
      state.instructors[semesterId] = instructors;
      state.status =  'success';
    },
    instructorsError: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    },
    setInstructorStatus: (state, action) => {
      state.status = action.payload;
    }
  }
})

export const { instructorsSuccess, instructorsError, setInstructorStatus } = instructorsSlice.actions;

export const selectInstructorsById = (state, semesterId) => {
  console.log(state[semesterId])
  return {
    status: state.instructors.status,
    instructors: state.instructors.instructors[semesterId] ?? []
  }
}
export default instructorsSlice.reducer;