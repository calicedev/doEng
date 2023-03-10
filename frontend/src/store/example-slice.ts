import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isLoading: false,
  isError: false,
  reviewList: [],
  ex: "example",
}

const exSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    changeEx(state, action) {
      state.ex = action.payload.exval
    },
    setLoading(state, action) {
      state.isLoading = true
    },
    endLoading(state, action) {
      state.isLoading = false
    },
  },
})

export const exActions = exSlice.actions
export default exSlice.reducer
