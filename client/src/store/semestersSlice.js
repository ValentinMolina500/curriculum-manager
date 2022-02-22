import { createSlice } from "@reduxjs/toolkit"

export const semestersSlice = createSlice({
  name: "semester",
  initialState: {
    semesters: [],
    status: 'idle',
    error: null,
    selectedSemester: null
  },
  reducers: {
    semestersSuccess: (state, action) => {
      state.semesters = action.payload;
      state.status =  'success';
    },
    semestersError: (state, action) => {
      state.status = 'error';
    },
    setSemesterStatus: (state, action) => {
      state.status = action.payload;
    },
    setSelectedSemester: (state, action) => {
      state.selectedSemester = action.payload;
    }
  }
})

export const { semestersSuccess, semestersError, setSemesterStatus, setSelectedSemester } = semestersSlice.actions;

export const selectSemestersById = (state, id) => state.semesters.semesters.find((semester) => semester.id === id);

export default semestersSlice.reducer;