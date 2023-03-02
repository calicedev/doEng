import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  ex: "example",
}

const exSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    changeEx(state, action) {
      state.ex = action.payload.exval
    },
  },
})

export const exActions = exSlice.actions
export default exSlice.reducer
