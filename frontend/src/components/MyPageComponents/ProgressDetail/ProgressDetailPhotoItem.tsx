import Modal from "components/UI/Modal"
import React, { useState, PropsWithChildren } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import IconButton from "components/UI/IconButton"
import { ProgressScene, ProgressImage } from "hooks/queries/queries"
import { BiDownload } from "react-icons/bi"
interface Props {
  image: ProgressImage
}

const PHOTOS_PER_PAGE = 3

function ProgressDetailPhotoItem({ image }: PropsWithChildren<Props>) {
  const downloadImage = () => {
    const tempLink = document.createElement("a")
    tempLink.href = image.image
    tempLink.download = "image.jpg"
    document.body.appendChild(tempLink)
    tempLink.click()
    document.body.removeChild(tempLink)
  }

  return (
    <div className="px-3 pt-3 pb-1 bg-white">
      <div className={`relative soverflow-hidden pb-[60%]`}>
        <img
          src={image.image}
          alt="이미지"
          className={`absolute top-0 left-0 w-full h-full object-cover`}
        />
      </div>
      <IconButton
        icon={<BiDownload />}
        label="다운로드"
        size="small"
        onClick={downloadImage}
        labelPosition="left"
      />
    </div>
  )
}

export default ProgressDetailPhotoItem
