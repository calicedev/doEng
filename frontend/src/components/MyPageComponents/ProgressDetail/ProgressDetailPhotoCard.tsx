import React, { useState } from "react"
import ProgressDetailPhotoModal from "./ProgressDetailPhotoModal"

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
  const [showModal, setShowModal] = useState(false)

  const handleImageClick = (image: string) => {
    setShowModal(true)
  }
  return (
    <div>
      {photoCard.sceneTitle}
      <img
        src={photoCard.imageList[0].image}
        alt="progressPhotoCard"
        className="cursor-pointer"
        onClick={() => handleImageClick(photoCard.imageList[0].image)}
      />

      <ProgressDetailPhotoModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        {photoCard.imageList.map((image: SceneImage) => (
          <img key={image.id} src={image.image} alt="modalImage" />
        ))}
      </ProgressDetailPhotoModal>
    </div>
  )
}

export default ProgressDetailPhotoCard
