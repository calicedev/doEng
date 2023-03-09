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
  return (
    <div>
      <p>ProgressDetailPhotoCard</p>
      {photoCard.sceneTitle}
    </div>
  )
}

export default ProgressDetailPhotoCard
