import React, {
  useState,
  useMemo,
  useEffect,
  PropsWithChildren,
  useRef,
} from "react"
import ProgressDetailSceneItem from "./ProgressDetailSceneItem"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import IconButton from "components/UI/IconButton"
import { ProgressScene } from "hooks/queries/queries"
import AnimationBox, { textOneByOne } from "components/UI/AnimationBox"
import { useWidthHeight } from "hooks/useWidthHwight"

interface Props {
  sceneList: ProgressScene[]
}

function ProgressDetailSceneList({ sceneList }: PropsWithChildren<Props>) {
  const [currentPage, setCurrentPage] = useState(0)

  const [width, setWidth] = useState(window.innerWidth)

  // 윈도우 크기에 따라 리사이즈
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const numScenes = useMemo(() => {
    if (width >= 1024) {
      return 3
    } else if (width >= 768) {
      return 2
    } else {
      return 1
    }
  }, [width])

  // 총 페이지 수
  const totalPages = useMemo(() => {
    return Math.ceil(sceneList.length / numScenes)
  }, [numScenes])

  // 화살표 아이콘 버튼 클릭 시 동작함수
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="w-full h-full">
      <div className={`text-2xl font-bold mb-2`}>학습 앨범</div>
      <div className={`flex items-center gap-10 sm:gap-8 h-full`}>
        <IconButton
          icon={<FaChevronLeft />}
          disabled={currentPage === 0}
          onClick={() => handlePageChange(currentPage - 1)}
        />
        <div
          className={`flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12`}
        >
          {sceneList
            .slice(currentPage * numScenes, (currentPage + 1) * numScenes)
            .map((scene: ProgressScene, idx) => (
              <AnimationBox
                key={`scene-${scene.id}`}
                appearClassName={`${textOneByOne[idx + 3]}`}
              >
                <ProgressDetailSceneItem scene={scene} />
              </AnimationBox>
            ))}
        </div>
        <IconButton
          icon={<FaChevronRight />}
          disabled={currentPage === totalPages - 1}
          onClick={() => handlePageChange(currentPage + 1)}
        />
      </div>
    </div>
  )
}

export default ProgressDetailSceneList
