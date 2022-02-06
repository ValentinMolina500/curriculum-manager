import { createSlice } from "@reduxjs/toolkit"

export const sessionsSlice = createSlice({
  name: "session",
  initialState: {
    sessions: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    sessionsSuccess: (state, action) => {
      state.sessions = action.payload;
      state.status =  'success';
    },
    sessionsError: (state, action) => {
      state.status = 'error';
    },
    setSessionStatus: (state, action) => {
      state.status = action.payload;
    }
  }
})

export const { sessionsSuccess, sessionsError, setSessionStatus } = sessionsSlice.actions;

export const selectSessions = (state) => state.sessions.sessions;
export const selectSessionsById = (state, id) => state.sessions.sessions.find((session) => session.id === id);

export default sessionsSlice.reducer;