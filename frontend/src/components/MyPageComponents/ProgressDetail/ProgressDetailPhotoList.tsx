import Modal from "components/UI/Modal"
import React, { useState, useMemo, PropsWithChildren } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import IconButton from "components/UI/IconButton"
import { ProgressScene, ProgressImage } from "hooks/queries/queries"
import ProgressDetailPhotoItem from "./ProgressDetailPhotoItem"

interface Props {
  imageList: ProgressImage[]
}

const PHOTOS_PER_PAGE = 3

function ProgressDetailPhotoList({ imageList }: PropsWithChildren<Props>) {
  const [isModal, setIsModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  // 총 페이지 수
  const totalPages = useMemo(() => {
    return Math.ceil(imageList.length / PHOTOS_PER_PAGE)
  }, [])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <>
      <div className="flex justify-between">
        <IconButton
          icon={<FaChevronLeft />}
          disabled={currentPage === 0}
          onClick={() => handlePageChange(currentPage - 1)}
        />
        <div
          className={`flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4`}
        >
          {imageList
            .slice(
              currentPage * PHOTOS_PER_PAGE,
              (currentPage + 1) * PHOTOS_PER_PAGE,
            )
            .map((image: ProgressImage) => (
              <ProgressDetailPhotoItem
                key={`image-${image.id}`}
                image={image}
              />
            ))}
        </div>
        <IconButton
          icon={<FaChevronRight />}
          disabled={currentPage === totalPages - 1}
          onClick={() => handlePageChange(currentPage + 1)}
        />
      </div>
      <div className="text-white text-sm text-center">
        Page {currentPage + 1} of {totalPages}
      </div>
    </>
  )
}

export default ProgressDetailPhotoList
