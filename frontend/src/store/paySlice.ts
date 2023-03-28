import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  wannaBought: null,
  tid: "",
}

const paySlice = createSlice({
  name: "pay",
  initialState,
  reducers: {
    setWannaBought(state, action) {
      state.wannaBought = action.payload.taleId
    },
    resetWannaBought(state, action) {
      state.wannaBought = null
    },
    setTid(state, action) {
      state.tid = action.payload.tid
    },
    resetTid(state, action) {
      state.tid = ""
    },
  },
})

export const payActions = paySlice.actions
export default paySlice.reducer
