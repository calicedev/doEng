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
    if (width > 1024) {
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
      <div className={`font-bold`}>학습 앨범</div>
      <div className={`flex gap-7 items-center h-full w-full`}>
        <IconButton
          icon={<FaChevronLeft />}
          disabled={currentPage === 0}
          onClick={() => handlePageChange(currentPage - 1)}
        />
        {sceneList
          .slice(currentPage * numScenes, (currentPage + 1) * numScenes)
          .map((scene: ProgressScene) => (
            <ProgressDetailSceneItem key={`scene-${scene.id}`} scene={scene} />
          ))}
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
