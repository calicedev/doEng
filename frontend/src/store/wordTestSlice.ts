import { createSlice } from "@reduxjs/toolkit"

interface wordTestListStore {
  wordTestList: wordTestStore[]
}

interface wordTestStore {
  wordId: number
  taleId: number
  correct: boolean
}

const initialState: wordTestListStore = {
  wordTestList: [],
}

const wordTestSlice = createSlice({
  name: "wordTestResult",
  initialState,
  reducers: {
    appendWordTest(state, action) {
      if (state.wordTestList === undefined) {
        state.wordTestList = [action.payload.wordTest]
      }
      state.wordTestList = [...state.wordTestList, action.payload.wordTest]
      console.log(state.wordTestList, ">>>>>>>>")
    },
    resetWordTest(state, action) {
      state.wordTestList = []
      console.log(state.wordTestList, "<<<<<<<")
    },
  },
})

export const wordTestActions = wordTestSlice.actions
export default wordTestSlice.reducer
