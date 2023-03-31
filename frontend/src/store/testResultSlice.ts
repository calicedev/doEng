import { createSlice } from "@reduxjs/toolkit"

interface testResultStore {
  id: number
  image: string
  engWord: string
  korWord: string
}

interface wordResultStore {
  title: string
  testList: testResultStore[]
}

const initialState: wordResultStore = {
  title: "",
  testList: [],
}

const testResultSlice = createSlice({
  name: "saveTestResult",
  initialState,
  reducers: {
    saveTestResult(state, action) {
      state.testList = [action.payload.wordResult]
      console.log(state.testList, ">>>>>>>>")
    },
  },
})

export const testResultActions = testResultSlice.actions
export default testResultSlice.reducer
