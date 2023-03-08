import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  accessToken: null,
  refreshToken: null,
  expiration: null,
}

const exSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setTokens(state, action) {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload.accessToken
    },
    deleteTokens(state, action) {
      state.accessToken = null
      state.refreshToken = null
      state.expiration = null
    },
  },
})

export const tokenActions = exSlice.actions
export default exSlice.reducer
