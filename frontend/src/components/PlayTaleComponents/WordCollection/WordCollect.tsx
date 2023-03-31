import { useWordList } from "hooks/queries/queries"
import LoadingPage from "pages/LoadingPage"
import WordCard from "../WordCard/WordCard"
import TaleNavigator from "components/UI/TaleNavigator"
import WordCollectBack from "assets/images/WordCollectBack.png"

function WordCollect() {
  const {
    isLoading: WordListLoading,
    error: WordListError,
    data: WordList,
  } = useWordList()

  console.log("11111333333")
  console.log(WordList)

  if (WordListLoading) {
    return <LoadingPage />
  } else if (!WordList) {
    return <div>단어 카드가 존재하지 않습니다</div>
  }

  return (
    <>
      {/* <div className=" bg-yellow-900 -z-[80]"> */}
      <TaleNavigator />
      <img
        alt="배경"
        src={WordCollectBack}
        className="canvas-under-bg-container bg-vegis absolute -z-[60] h-full w-full"
      />

      {WordList ? (
        <div className="w-full h-full grid grid-rows-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 p-8">
          {WordList?.map((word) => (
            <WordCard key={`word-card-${word.id}`} word={word} />
          ))}
        </div>
      ) : (
        <div>잘못된 접근입니다.</div>
      )}
      {/* </div> */}
    </>
  )
}

export default WordCollect
