// import { useWordTestResultSave } from "hooks/queries/queries"
import LoadingPage from "pages/LoadingPage"
import WordTestResultItem from "./WordTestResultItem"
import { useStoreDispatch, useStoreSelector } from "hooks/useStoreSelector"
import { testResultActions } from "store/testResultSlice"

function WordTestResult() {
  const wordResult = useStoreSelector((state) => state.testResult)
  console.log(wordResult, "wordResult333333")
  console.log(wordResult.testList, "wordResult testList")
  console.log(wordResult.title, "wordResult Title 7777")

  // if (WordResultLoading) {
  //   return <LoadingPage />
  // } else if (!WordResult) {
  //   return <div> 테스트 결과가 존재하지 않습니다 </div>
  // }

  return (
    <>
      {/* {WordResult.title}
      <div>테스트 결과 컴포</div>
      {WordResult.testList ? (
        WordResult.testList.map((word) => (
          <WordTestResultItem key={`word-result-${word.id}`} word={word} />
        ))
      ) : (
        <div>맞은 단어가 없습니다.</div>
      )} */}
    </>
  )
}

export default WordTestResult
