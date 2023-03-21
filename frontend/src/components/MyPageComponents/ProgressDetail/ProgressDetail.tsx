import React from "react"
import MyPageButton from "components/MyPageComponents/common/MyPageButton"
import { useNavigate } from "react-router-dom"

interface SceneImage {
  id: number
  image: string
}

interface Scene {
  id: number
  sceneTitle: string
  imageList: SceneImage[]
}

interface Word {
  engWord: string
  correctList: boolean[]
}

interface TestResult {
  testCount: number
  wordList: Word[]
}

interface DummyData {
  id: number | string
  title: string
  backgroundImage: string
  sceneList: Scene[]
  testResult: TestResult
}

interface TaleProps {
  tale: DummyData
}

function ProgressDetail({ tale }: TaleProps) {
  const navigate = useNavigate()
  const toTaleDetail = () => {
    navigate(`/mypage/talestore/${tale.id}`)
  }

  return (
    <div>
      <div>
        <img src={tale.backgroundImage} alt="progressDetailBackground" />
        <div className={`font-bold text-xl grid place-content-center p-3`}>
          {tale.title}
        </div>
        <div className={`grid place-content-center p-2`}>
          <MyPageButton text="책 상세" onClick={toTaleDetail} />
        </div>
      </div>
    </div>
  )
}

export default ProgressDetail

// <a href={tale.backgroundImage} download>
//   <img src={tale.backgroundImage} alt="W3Schools" />
// </a>
