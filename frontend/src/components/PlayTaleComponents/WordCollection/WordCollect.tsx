import { useWordList } from "hooks/queries/queries"
import WordCard from "../WordCard/WordCard"

function WordCollect() {
  const {
    isLoading: WordListLoading,
    error: WordListError,
    data: WordList,
  } = useWordList()

  console.log("11111333333")
  console.log(WordList)

  if (!WordList) {
    return <div>단어 카드가 존재하지 않습니다</div>
  }

  return (
    <>
      {WordListLoading ? (
        <div>로딩 중</div>
      ) : WordList ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 p-8">
          {WordList?.map((word) => (
            <WordCard key={`word-card-${word.id}`} word={word} />
          ))}
        </div>
      ) : (
        <div>잘못된 접근입니다.</div>
      )}
      <div>단어 도감</div>
    </>
  )
}

export default WordCollect
