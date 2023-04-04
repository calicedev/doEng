import WordTest from "components/PlayTaleComponents/WordTest/WordTesting"
import { Outlet, useParams } from "react-router-dom"
import { useWordTestResult } from "hooks/queries/queries"
import WordTesting from "components/PlayTaleComponents/WordTest/WordTesting"
import LoadingPage from "./LoadingPage"
import { useStoreDispatch, useStoreSelector } from "hooks/useStoreSelector"
import React, { useEffect } from "react"
import { wordTestActions } from "store/wordTestSlice"

function WordTestPage() {
  const { taleId } = useParams() as { taleId: string }
  const {
    isLoading: WordInfoLoading,
    error: WordInfoError,
    data: WordInfo,
  } = useWordTestResult(parseInt(taleId))

  const dispatch = useStoreDispatch()

  useEffect(() => {
    dispatch(wordTestActions.resetWordTest({}))
  }, [])

  if (!WordInfo || WordInfoLoading) {
    return <LoadingPage />
  }
  return (
    <div className="h-full w-full">
      <WordTesting key={WordInfo.title} wordInfo={WordInfo} />
    </div>
  )
}

export default WordTestPage
