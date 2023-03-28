import WordTest from "components/PlayTaleComponents/WordTest/WordTest"
import { Outlet, useParams } from "react-router-dom"
import { useWordTestResult } from "hooks/queries/queries"

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
      <div>단어 테스트 페이지</div>
      <WordTest />
    </>
  )
}

export default WordTestPage
