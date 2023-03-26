import Modal from "components/UI/Modal"
import React, { useState, PropsWithChildren } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import IconButton from "components/UI/IconButton"
import { ProgressScene, ProgressImage } from "hooks/queries/queries"

interface Props {
  photoCard: ProgressScene
}

function ProgressDetailPhotoCard({ photoCard }: PropsWithChildren<Props>) {
  const [isModal, setIsModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const pageSize = 3
  const totalPages = photoCard.imageList
    ? Math.ceil(photoCard.imageList.length / pageSize)
    : 1

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleImageClick = (image: string) => {
    setIsModal(true)
  }
  return (
    <>
      <div
        className={`cursor-pointer`}
        onClick={() => handleImageClick(photoCard.imageList[0].image)}
      >
        <img
          src={photoCard.imageList && photoCard.imageList[0].image}
          alt="progressPhotoCard"
          className="w-full"
        />
        {photoCard.sceneTitle}
      </div>

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
                .map((image: ProgressImage) => (
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
    </>
  )
}

export default ProgressDetailPhotoCard
