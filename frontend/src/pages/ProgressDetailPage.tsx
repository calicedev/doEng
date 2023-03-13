import React from "react"
import { useParams } from "react-router-dom"
import dummy from "components/MyPageComponents/DummyData/ProgressDetail.json"
import ProgressDetail from "components/MyPageComponents/ProgressDetail/ProgressDetail"
import ProgressDetailTest from "components/MyPageComponents/ProgressDetail/ProgressDetailTest"
import ProgressDetailPhoto from "components/MyPageComponents/ProgressDetail/ProgressDetailPhoto"

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

function ProgressDetailPage() {
  const { taleId } = useParams()
  const { taleList }: { taleList: DummyData[] } = dummy

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/3 p-10 ">
          {taleList.map((tale: DummyData) =>
            taleId == tale.id ? (
              <ProgressDetail key={tale.id} tale={tale} />
            ) : null,
          )}
        </div>
        <div className="md:w-2/3 md:flex md:flex-col md:justify-between p-10">
          <div className="mb-4 pb-32 pl-10 pr-10">
            {taleList.map((tale: DummyData) =>
              taleId == tale.id ? (
                <ProgressDetailPhoto key={tale.id} talePhoto={tale.sceneList} />
              ) : null,
            )}
          </div>
          <div className="pl-10">
            {taleList.map((tale: DummyData) =>
              taleId == tale.id ? (
                <ProgressDetailTest key={tale.id} taleTest={tale.testResult} />
              ) : null,
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressDetailPage
