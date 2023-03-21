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
    <div className="h-full flex flex-nowrap">
      <div className=" basis-1/3 p-10 place-self-center">
        {taleList.map((tale: DummyData) =>
          taleId == tale.id ? (
            <ProgressDetail key={tale.id} tale={tale} />
          ) : null,
        )}
      </div>
      <div className={`flex flex-col basis-2/3`}>
        <div className=" basis-1/2">
          {taleList.map((tale: DummyData) =>
            taleId == tale.id ? (
              <ProgressDetailPhoto key={tale.id} talePhoto={tale.sceneList} />
            ) : null,
          )}
        </div>
        <div className="basis-1/2 place-self-center pt-[10%]">
          {taleList.map((tale: DummyData) =>
            taleId == tale.id ? (
              <ProgressDetailTest key={tale.id} taleTest={tale.testResult} />
            ) : null,
          )}
        </div>
      </div>
    </div>
  )
}

export default ProgressDetailPage
