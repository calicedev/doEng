import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isLoading: false,
  isError: false,
  reviewList: [],
  ex: "example",
}

const userSlice = createSlice({
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

export const userActions = userSlice.actions
export default userSlice.reducer
