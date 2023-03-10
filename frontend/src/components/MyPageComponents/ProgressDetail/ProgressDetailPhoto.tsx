import React from "react"
import ProgressDetailPhotoCard from "./ProgressDetailPhotoCard"

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
  return (
    <div>
      <p>학습 앨범</p>
      {talePhoto.map((photo: Scene) => (
        <ProgressDetailPhotoCard key={photo.id} photoCard={photo} />
      ))}
    </div>
  )
}

export default ProgressDetailPhoto
