import Modal from "components/UI/Modal"
import React, { useState } from "react"
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

interface PhotoCard {
  photoCard: Scene
}

function ProgressDetailPhotoCard({ photoCard }: PhotoCard) {
  const [isModal, setIsModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const pageSize = 3
  const totalPages = Math.ceil(photoCard.imageList.length / pageSize)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleImageClick = (image: string) => {
    setIsModal(true)
  }
  return (
    <div>
      <img
        src={photoCard.imageList[0].image}
        alt="progressPhotoCard"
        className="cursor-pointer"
        onClick={() => handleImageClick(photoCard.imageList[0].image)}
      />
      {photoCard.sceneTitle}

      {isModal && (
        <Modal closeModal={() => setIsModal(false)}>
          <div className="flex justify-between mt-4">
            <IconButton
              icon={<FaChevronLeft />}
              disabled={currentPage === 0}
              onClick={() => handlePageChange(currentPage - 1)}
            />
            <div
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`}
            >
              {photoCard.imageList
                .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                .map((image: SceneImage) => (
                  <div
                    className={`overflow-hidden relative w-[400px]`}
                    style={{ paddingBottom: "100.33%" }}
                  >
                    <img
                      key={image.id}
                      src={image.image}
                      alt="modalImage"
                      className={`absolute top-0 left-0 w-full h-full object-cover`}
                    />
                  </div>
                ))}
            </div>

            <IconButton
              icon={<FaChevronRight />}
              disabled={currentPage === totalPages - 1}
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </div>
          <div className="text-gray-600">
            Page {currentPage + 1} of {totalPages}
          </div>
        </Modal>
      )}
    </div>
  )
}

export default ProgressDetailPhotoCard
