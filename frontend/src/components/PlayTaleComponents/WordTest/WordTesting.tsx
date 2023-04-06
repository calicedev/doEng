import React, { PropsWithChildren, useEffect, useMemo, useState } from "react"
import { Outlet, useParams, useNavigate } from "react-router-dom"
import {
  WordTest,
  useTestMutation,
  WordResult,
  TestResult,
} from "hooks/queries/queries"
import WordTestItem from "./WordTestItem"
import { useStoreDispatch, useStoreSelector } from "hooks/useStoreSelector"
import { wordTestActions } from "store/wordTestSlice"
import { testResultActions } from "store/testResultSlice"
import TaleNavigator from "components/UI/TaleNavigator"
import SuperHeroLanding from "components/PlayTaleComponents/SuperHeroLanding"
import WordTestBack from "assets/images/wordTestBack.png"
import WordTestTitle from "assets/images/wordTestTitle.png"
import Background from "assets/images/Background.png"

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
  // const wordList: wordTestStore[] = useStoreSelector(
  //   (state) => state.wordTest.wordTestList,
  // )
  const wordList: wordTestStore[] = useStoreSelector(
    (state) => state.wordTest.wordTestList || [],
  )
  const dispatch = useStoreDispatch()

  const wordMutate = () => {
    WordTestMutate({
      method: `post`,
      url: `/api/word-test`,
      data: { wordList },
    })
      .then((res) => {
        const wordResult: WordResult = res.data
        dispatch(testResultActions.saveTestResult({ wordResult }))
        navigate("result")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleResponse = async (response: boolean) => {
    const wordTest: wordTestStore = {
      // wordId: wordInfo.testList[wordList.length].id,
      // taleId: parseInt(taleId),
      // correct: response,
      wordId: wordInfo.testList[wordList?.length || 0].id,
      taleId: parseInt(taleId),
      correct: response,
    }

    if (!wordList || wordList.length < 5) {
      dispatch(wordTestActions.appendWordTest({ wordTest: wordTest }))
      console.log(wordTest, "wordtest")
    } else {
      dispatch(wordTestActions.appendWordTest({ wordTest: wordTest }))
      console.log(wordList, "wordList2222")
    }
  }

  useEffect(() => {
    if (wordList.length === 5) {
      wordMutate()
    } else if (wordList.length > 5) {
      dispatch(wordTestActions.resetWordTest({}))
      navigate(-1)
    }
  }, [wordList])

  const currentWordInfo = useMemo(() => {
    if (!wordList || wordList.length === 0) {
      return wordInfo.testList[0]
      // engWord: "",
      // id: 0,
      // image: "",
      // korVoice: "",
      // korWord: "",
      // wrongImage: "",
    }
    return wordInfo.testList[wordList.length]
  }, [wordList])

  return (
    <>
      <TaleNavigator />
      <img
        alt="배경"
        src={Background}
        className="canvas-under-bg-container bg-vegis absolute -z-[60] h-full w-full"
      />
      <SuperHeroLanding>
        <img
          alt="단어테스트 배경"
          src={WordTestBack}
          className="w-[95%] h-[90%] -z-10 fixed top-[13%]"
        />
        <img
          alt="동화 제목"
          src={WordTestTitle}
          className=" z-20 fixed top-[-15%] h-[40%] w-[40%]"
        />
        <div className="z-30 fixed top-[9%] text-[220%] text-orange-900">
          {wordInfo.title}
        </div>
      </SuperHeroLanding>

      {wordList.length < 5 ? (
        <WordTestItem
          key={`item-${wordInfo?.title}`}
          wordInfo={currentWordInfo}
          handleResponse={handleResponse}
        />
      ) : null}
    </>
  )
}

export default WordTesting
