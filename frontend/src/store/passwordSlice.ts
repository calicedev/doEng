import { createSlice } from "@reduxjs/toolkit"

interface passwordStore {
  isCert: boolean
}

const initialState: passwordStore = {
  isCert: false,
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
    },
  },
})

export const passwordActions = passwordSlice.actions
export default passwordSlice.reducer
