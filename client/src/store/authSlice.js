import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    status: 'idle',
    error: null,
    token: null
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.status = 'success'
    },
    setAuthStatus: (state, action) => {
      state.status = action.payload
    },
    authError: (state, action) => {
      state.error = action.payload
      state.status = "failed"
    }
  }
})

export const { loginSuccess, setAuthStatus, authError } = authSlice.actions;

export default authSlice.reducer;