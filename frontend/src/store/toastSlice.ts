import { createSlice } from "@reduxjs/toolkit"

interface toastStore {
  isToast: boolean
  isSuccess: boolean | null
  message: string
}

const initialState: toastStore = {
  isToast: false,
  isSuccess: null,
  message: "",
}

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToast(state, action) {
      state.isToast = true
    },
    toastOff(state, action) {
      state.isToast = false
    },
    setToastMessage(state, action) {
      state.message = action.payload.message
    },
    setIsSuccess(state, action) {
      state.isSuccess = action.payload.isSuccess
    },
  },
})

export const toastActions = toastSlice.actions
export default toastSlice.reducer
