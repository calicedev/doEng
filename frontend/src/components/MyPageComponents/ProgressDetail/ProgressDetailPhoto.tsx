import React, { useState, PropsWithChildren } from "react"
import ProgressDetailPhotoCard from "./ProgressDetailPhotoCard"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import IconButton from "components/UI/IconButton"
import { ProgressScene } from "hooks/queries/queries"

interface Props {
  talePhoto: ProgressScene[]
}

function ProgressDetailPhoto({ talePhoto }: PropsWithChildren<Props>) {
  const [currentPage, setCurrentPage] = useState(0)
  const pageSize = 3
  const totalPages = Math.ceil(talePhoto.length / pageSize)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="h-full">
      <div className={`basis-1/5 font-bold pb-[5%] pt-5`}>학습 앨범</div>
      <div className={`h-[70%]`}>
        <div className={` flex flex-row h-full w-full`}>
          <IconButton
            icon={<FaChevronLeft />}
            disabled={currentPage === 0}
            onClick={() => handlePageChange(currentPage - 1)}
            colorClass={``}
          />

          {talePhoto
            .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
            .map((photo: ProgressScene) => (
              // <div className={`overflow-hidden relative w-32`}>
              <div className=" relative h-full w-[25%] mr-5 ml-5">
                <div className=" bg-white w-full h-full rotate-12 shadow-lg"></div>
                <div className="absolute top-0 left-0 w-full h-full p-5 shadow-lg overflow-hidden transform hover:rotate-3 hover:-translate-x-1 hover:-translate-y-1 duration-200 bg-white">
                  <ProgressDetailPhotoCard key={photo.id} photoCard={photo} />
                </div>
              </div>
            ))}

          <IconButton
            icon={<FaChevronRight />}
            disabled={currentPage === totalPages - 1}
            onClick={() => handlePageChange(currentPage + 1)}
            colorClass={``}
          />
        </div>
      </div>
    </div>
  )
}

export default ProgressDetailPhoto
