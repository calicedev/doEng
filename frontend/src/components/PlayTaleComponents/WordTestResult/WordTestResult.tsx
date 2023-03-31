// import { useWordTestResultSave } from "hooks/queries/queries"
import LoadingPage from "pages/LoadingPage"
import WordTestResultItem from "./WordTestResultItem"
import { useStoreDispatch, useStoreSelector } from "hooks/useStoreSelector"
import { testResultActions } from "store/testResultSlice"
import { useNavigate } from "react-router-dom"

function WordTestResult() {
  const navigate = useNavigate()
  const wordResult = useStoreSelector((state) => state.testResult)
  console.log(wordResult, "wordResult333333")
  console.log(wordResult.testList, "wordResult testList")
  console.log(wordResult.title, "wordResult Title 7777")

  const onFinishHandler = function () {
    navigate(`/playtale`)
  }

  return (
    <>
      <div>테스트 결과 컴포</div>
      {wordResult.title}
      {wordResult.testList ? (
        wordResult.testList.map((word) => (
          <WordTestResultItem key={`word-result-${word.id}`} word={word} />
        ))
      ) : (
        <div>맞은 단어가 없습니다.</div>
      )}

      <div
        className="w-[20%] h-[20%] flex items-center justify-center rounded-full cursor-pointer bg-lime-300 border-[5px] border-lime-500 shadow-lg duration-[0.33s] hover:scale-[107%] font-jalnan text-[1.1rem] md:text-[1.4rem] lg:text-[1.6rem] "
        onClick={onFinishHandler}
      >
        Finish
      </div>
    </>
  )
}

export default WordTestResult
