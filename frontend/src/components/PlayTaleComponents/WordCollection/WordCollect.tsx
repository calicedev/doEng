import { useNavigate } from "react-router-dom"
import { useWordList } from "hooks/queries/queries"
import { useStoreDispatch } from "hooks/useStoreSelector"
import { DispatchToast } from "store"
import LoadingPage from "pages/LoadingPage"
import WordCard from "../WordCard/WordCard"
import TaleNavigator from "components/UI/TaleNavigator"
import WordCollectBack from "assets/images/WordCollectBack.png"
import { useState, useMemo } from "react"
import SuperHeroLanding from "../SuperHeroLanding"
import wordbook from "assets/images/wordbook.png"
import Background from "assets/images/Background.png"

const ITEMS_PER_PAGE = 8

function WordCollect() {
  const dispatch = useStoreDispatch()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const {
    isLoading: wordListLoading,
    error: wordListError,
    data: wordList,
  } = useWordList()

  const currentItems = useMemo(() => {
    if (!wordList) {
      return []
    }
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE
    const currentItems = wordList.slice(indexOfFirstItem, indexOfLastItem)
    return currentItems
  }, [wordList, currentPage])

  const totalPages = useMemo(() => {
    if (!wordList) {
      return 0
    }
    return Math.ceil(wordList.length / ITEMS_PER_PAGE)
  }, [wordList])

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <>
      {wordListLoading ? (
        <LoadingPage />
      ) : wordListError ? (
        (dispatch(DispatchToast("에러가 발생했습니다.", true)),
        navigate(`/playtale`))
      ) : (
        <>
          {/* <div className=" bg-yellow-900 -z-[80]"> */}
          <TaleNavigator />
          <img
            alt="배경"
            src={Background}
            className="canvas-under-bg-container bg-vegis absolute -z-[60] h-full w-full"
          />
          <SuperHeroLanding />
          <img
            alt="배경"
            src={wordbook}
            className="canvas-under-bg-container bg-vegis absolute -z-[55] h-full w-full"
          />

          {wordList?.length === 0 ? (
            <div>수집한 단어 카드가 없습니다.</div>
          ) : (
            <div className="w-full h-full grid grid-rows-2 grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 pl-[5%] pt-[10%] pr-[4%] pb-[10%] mr-[7%] ml-[7%] mb-[3%]">
              {currentItems.map((word) => (
                <WordCard key={`word-card-${word.id}`} word={word} />
              ))}
            </div>
          )}

          <div className="fixed bottom-[7%] justify-center mt-4 ">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`mx-1 pt-1 pb-1 pr-2 pl-2 roun rounded ${
                  i + 1 === currentPage ? " text-white" : "text-black"
                }`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default WordCollect
