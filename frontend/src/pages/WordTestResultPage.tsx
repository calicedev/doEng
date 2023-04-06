import WordTestResult from "components/PlayTaleComponents/WordTestResult/WordTestResult"
import React, { useEffect } from "react"
import { wordTestActions } from "store/wordTestSlice"
import { useStoreDispatch, useStoreSelector } from "hooks/useStoreSelector"

function WordTestResultPage() {
  const dispatch = useStoreDispatch()

  useEffect(() => {
    dispatch(wordTestActions.resetWordTest({}))
  }, [])
  return (
    <div className="h-full w-full">
      <WordTestResult />
    </div>
  )
}

export default WordTestResultPage
