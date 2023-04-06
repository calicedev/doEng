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
      state.testList = action.payload.wordResult.testList
      state.title = action.payload.wordResult.title
      console.log(state.testList, ">>>>>>>>")
    },
    resetTestResult(state, action) {
      state.testList = []
      state.title = ""
    },
  },
})

export const testResultActions = testResultSlice.actions
export default testResultSlice.reducer
