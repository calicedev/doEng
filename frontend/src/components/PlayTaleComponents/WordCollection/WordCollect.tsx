import { useWordList } from "hooks/queries/queries"
import LoadingPage from "pages/LoadingPage"
import WordCard from "../WordCard/WordCard"
import TaleNavigator from "components/UI/TaleNavigator"
import WordCollectBack from "assets/images/WordCollectBack.png"
import { useState } from "react"
import SuperHeroLanding from "../SuperHeroLanding"

function WordCollect() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(8)

  const {
    isLoading: WordListLoading,
    error: WordListError,
    data: WordList,
  } = useWordList()

  if (WordListLoading) {
    return <LoadingPage />
  }

  if (WordListError || !WordList || WordList.length === 0) {
    return <div>단어 카드가 존재하지 않습니다</div>
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const currentItems = WordList.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(WordList.length / itemsPerPage)

  console.log(WordList, "11123344")

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <>
      {/* <div className=" bg-yellow-900 -z-[80]"> */}
      <TaleNavigator />
      <SuperHeroLanding />
      <img
        alt="배경"
        src={WordCollectBack}
        className="canvas-under-bg-container bg-vegis absolute -z-[60] h-full w-full"
      />

      <div className="w-full h-full grid grid-rows-2 grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-6 pl-[10%] pt-[10%] pr-[4%] pb-[10%]">
        {currentItems.map((word) => (
          <WordCard key={`word-card-${word.id}`} word={word} />
        ))}
      </div>

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
    </>
  )
}

export default WordCollect
