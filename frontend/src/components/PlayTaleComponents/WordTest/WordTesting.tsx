import React, { PropsWithChildren, useState } from "react"
import { Outlet, useParams, useNavigate } from "react-router-dom"
import { WordTest, useTestMutation } from "hooks/queries/queries"
import WordTestItem from "./WordTestItem"
import { useStoreDispatch, useStoreSelector } from "hooks/useStoreSelector"
import { wordTestActions } from "store/wordTestSlice"

interface Props {
  wordInfo: WordTest
}

interface wordTestStore {
  wordId: number
  taleId: number
  correct: boolean
}

function WordTesting({ wordInfo }: PropsWithChildren<Props>) {
  const { taleId } = useParams() as { taleId: string }
  const navigate = useNavigate()
  const { mutateAsync: WordTestMutate } = useTestMutation()
  const wordList = useStoreSelector((state) => state.wordTest.wordTestList)

  console.log(wordInfo, "989898")

  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const dispatch = useStoreDispatch()

  const handleResponse = (response: boolean) => {
    const wordTest: wordTestStore = {
      wordId: wordInfo.testList[currentWordIndex].id,
      taleId: parseInt(taleId),
      correct: response,
    }
    if (currentWordIndex < 4) {
      dispatch(wordTestActions.appendWordTest({ wordTest: wordTest }))
      console.log(wordTest, "wordtest")
      setCurrentWordIndex(currentWordIndex + 1)
    } else {
      dispatch(wordTestActions.appendWordTest({ wordTest: wordTest }))
      console.log(wordTest, "wordtest")
      WordTestMutate({
        method: `post`,
        url: `api/word-test`,
        data: { wordList },
      })
        .then((res) => {
          console.log("성공성공이당")
        })
        .catch((err) => {
          console.log(err)
        })
      dispatch(wordTestActions.resetWordTest({ wordTest: wordTest }))
      navigate("result")
    }
  }

  const currentWordInfo = wordInfo.testList[currentWordIndex]

  return (
    <>
      <WordTestItem
        key="item-${WordInfo.title}"
        wordInfo={currentWordInfo}
        handleResponse={handleResponse}
      />
    </>
  )
}

export default WordTesting
