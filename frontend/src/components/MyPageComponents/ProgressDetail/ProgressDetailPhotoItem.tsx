import Modal from "components/UI/Modal"
import React, { useState, PropsWithChildren } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import IconButton from "components/UI/IconButton"
import {
  ProgressScene,
  ProgressImage,
  useProgressDetailMutation,
} from "hooks/queries/queries"
import { BiDownload } from "react-icons/bi"
import { BsTrash3Fill, BsZoomIn } from "react-icons/bs"
import { useParams } from "react-router-dom"

interface Props {
  image: ProgressImage
}

const PHOTOS_PER_PAGE = 3

function ProgressDetailPhotoItem({ image }: PropsWithChildren<Props>) {
  const { taleId } = useParams()

  const { mutate: progressDetailMutate } = useProgressDetailMutation(
    parseInt(taleId!),
  )

  const downloadImage = () => {
    const tempLink = document.createElement("a")
    tempLink.href = image.image
    tempLink.download = "image.jpg"
    document.body.appendChild(tempLink)
    tempLink.click()
    document.body.removeChild(tempLink)
  }

  const deleteImage = () => {
    progressDetailMutate({
      method: "delete",
      url: `api/mypage/picture/${image.id}`,
    })
  }

  return (
    <div className="relative px-3 pt-3 bg-white">
      <div className={`relative soverflow-hidden pb-[60%]`}>
        <img
          src={image.image}
          alt="이미지"
          className={`absolute top-0 left-0 w-full h-full object-cover`}
        />
      </div>
      <div className="py-2">
        <IconButton
          icon={<BsZoomIn />}
          label="크게보기"
          size="small"
          onClick={downloadImage}
          labelPosition="left"
        />
        <div className="absolute right-2 bottom-2">
          <IconButton
            icon={<BsTrash3Fill />}
            size="small"
            onClick={deleteImage}
          />
        </div>
      </div>
    </div>
  )
}

export default ProgressDetailPhotoItem
