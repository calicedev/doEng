import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  id: "",
  email: "",
  isCert: false,
}

const findSlice = createSlice({
  name: "find",
  initialState,
  reducers: {
    changeId(state, action) {
      state.id = action.payload.idInput
    },
    changeEmail(state, action) {
      state.email = action.payload.emailInput
    },
    certSuccess(state, action) {
      state.isCert = true
    },
    resetState(state, action) {
      state.id = ""
      state.email = ""
      state.isCert = false
    },
  },
})

export const findActions = findSlice.actions
export default findSlice.reducer
