import { createSlice } from "@reduxjs/toolkit"

interface passwordStore {
  isCert: boolean
  isGoogle: boolean
}

const initialState: passwordStore = {
  isCert: false,
  isGoogle: false,
}

const passwordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {
    rightPassword(state, action) {
      state.isCert = true
    },
    wrongPassword(state, action) {
      state.isCert = false
      state.isGoogle = false
    },
    setGoogle(state, action) {
      state.isGoogle = true
    },
  },
})

export const passwordActions = passwordSlice.actions
export default passwordSlice.reducer
