import React, { useState } from "react"
import ProgressDetailPhotoCard from "./ProgressDetailPhotoCard"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import IconButton from "components/UI/IconButton"

interface SceneImage {
  id: number
  image: string
}

interface Scene {
  id: number
  sceneTitle: string
  imageList: SceneImage[]
}

interface Photo {
  talePhoto: Scene[]
}

function ProgressDetailPhoto({ talePhoto }: Photo) {
  const [currentPage, setCurrentPage] = useState(0)
  const pageSize = 3
  const totalPages = Math.ceil(talePhoto.length / pageSize)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div>
      <p>학습 앨범</p>
      <div className="flex justify-between mt-4">
        <IconButton
          icon={<FaChevronLeft />}
          disabled={currentPage === 0}
          onClick={() => handlePageChange(currentPage - 1)}
          colorClass={``}
        />
        <div className={`grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4`}>
          {talePhoto
            .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
            .map((photo: Scene) => (
              <div className={`overflow-hidden relative w-32`}>
                <ProgressDetailPhotoCard key={photo.id} photoCard={photo} />
              </div>
            ))}
        </div>
        <IconButton
          icon={<FaChevronRight />}
          disabled={currentPage === totalPages - 1}
          onClick={() => handlePageChange(currentPage + 1)}
          colorClass={``}
        />
      </div>
    </div>
  )
}

export default ProgressDetailPhoto
