import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isLoading: false,
  isError: false,
  isLogin: false,
}

const userSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    setLogin(state, action) {
      state.isLogin = true
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
