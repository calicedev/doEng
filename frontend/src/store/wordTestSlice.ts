import { createSlice } from "@reduxjs/toolkit"

interface wordTestListStore {
  wordTestList: wordTestStore[]
}

interface wordTestStore {
  wordId: number
  taleId: number
  correct: boolean
}

const initialState = {
  wordTestList: [],
}

const wordTestSlice = createSlice({
  name: "wordTestResult",
  initialState,
  reducers: {
    appendWordTest(state, action) {
      console.log(state.wordTestList)
      // state.wordTestList = [...state.wordTestList, action.payload.wordTest]
    },
  },
})

export const wordTestActions = wordTestSlice.actions
export default wordTestSlice.reducer
