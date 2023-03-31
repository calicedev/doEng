import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  gId: "",
  gmail: "",
  gname: "",
}

const googleSlice = createSlice({
  name: "google",
  initialState,
  reducers: {
    resetGoogleSlice(state, action) {
      state.gId = ""
      state.gmail = ""
      state.gname = ""
    },
    setGoogleSlice(state, action) {
      state.gId = action.payload.gId
      state.gmail = action.payload.gmail
      state.gname = action.payload.gname
    },
  },
})

export const googleActions = googleSlice.actions
export default googleSlice.reducer
