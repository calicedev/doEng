import React from 'react'

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
  return (
    <div>
      <div>
        <p>ProgressDetail</p>
        <img src={tale.backgroundImage} alt="progressDetailBackground" />
        {tale.title}
      </div>
    </div>
  )
}

export default ProgressDetail
