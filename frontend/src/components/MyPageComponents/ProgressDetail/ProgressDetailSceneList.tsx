import React, { useState, useMemo, PropsWithChildren } from "react"
import ProgressDetailPhotoList from "./ProgressDetailPhotoList"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import IconButton from "components/UI/IconButton"
import { ProgressScene } from "hooks/queries/queries"

interface Props {
  photoList: ProgressScene[]
}

const SCENES_PER_PAGE = 3

function ProgressDetailPhoto({ photoList }: PropsWithChildren<Props>) {
  const [currentPage, setCurrentPage] = useState(0)

  // 총 페이지 수
  const totalPages = useMemo(() => {
    return Math.ceil(photoList.length / SCENES_PER_PAGE)
  }, [])

  // 화살표 아이콘 버튼 클릭 시 동작함수
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="w-full h-full">
      <div className={`font-bold`}>학습 앨범</div>
      <div className={`flex flex-wrap h-full w-full`}>
        <IconButton
          icon={<FaChevronLeft />}
          disabled={currentPage === 0}
          onClick={() => handlePageChange(currentPage - 1)}
        />
        {photoList
          .slice(
            currentPage * SCENES_PER_PAGE,
            (currentPage + 1) * SCENES_PER_PAGE,
          )
          .map((photo: ProgressScene) => (
            <ProgressDetailPhotoList key={photo.sceneTitle} photoCard={photo} />
          ))}
        <IconButton
          icon={<FaChevronRight />}
          disabled={currentPage === totalPages - 1}
          onClick={() => handlePageChange(currentPage + 1)}
        />
      </div>
    </div>
  )
}

export default ProgressDetailPhoto
