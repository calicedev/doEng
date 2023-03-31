import { useWordList } from "hooks/queries/queries"
import LoadingPage from "pages/LoadingPage"
import WordCard from "../WordCard/WordCard"
import TaleNavigator from "components/UI/TaleNavigator"
import WordCollectBack from "assets/images/WordCollectBack.png"
import { useState } from "react"

function WordCollect() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(8)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const {
    isLoading: WordListLoading,
    error: WordListError,
    data: WordList,
  } = useWordList()

  const currentItems = WordList?.slice(indexOfFirstItem, indexOfLastItem)
  console.log("11111333333")
  console.log(WordList)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  let totalPages: number = 0

  if (WordList) {
    const totalPages: number = Math.ceil(WordList.length / itemsPerPage)
  }

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
        <div className="w-full h-full grid grid-rows-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 pl-[10%] pt-[10%] pr-[8%] pb-[10%]">
          {currentItems?.map((word) => (
            <WordCard key={`word-card-${word.id}`} word={word} />
          ))}

          {/* {WordList?.map((word) => (
            <WordCard key={`word-card-${word.id}`} word={word} />
          ))} */}
        </div>
      ) : (
        <div>잘못된 접근입니다.</div>
      )}

      {WordList ? (
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`mx-1 p-1 rounded ${
                i + 1 === currentPage ? "bg-blue-500 text-white" : "bg-white"
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      ) : (
        <div>1</div>
      )}
      {/* </div> */}
    </>
  )
}

export default WordCollect
