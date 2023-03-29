import WordTest from "components/PlayTaleComponents/WordTest/WordTesting"
import { Outlet, useParams } from "react-router-dom"
import { useWordTestResult } from "hooks/queries/queries"
import WordTesting from "components/PlayTaleComponents/WordTest/WordTesting"

function WordTestPage() {
  const { taleId } = useParams() as { taleId: string }
  const {
    isLoading: WordInfoLoading,
    error: WordInfoError,
    data: WordInfo,
  } = useWordTestResult(parseInt(taleId))

  console.log(WordInfo, "1234444")

  return (
    <>
      {WordInfoLoading ? (
        <div>단어 테스트 페이지 로딩중</div>
      ) : WordInfo ? (
        <WordTesting key={WordInfo.title} wordInfo={WordInfo} />
      ) : (
        <div>잘못된 접근입니다.</div>
      )}
    </>
  )
}

export default WordTestPage
