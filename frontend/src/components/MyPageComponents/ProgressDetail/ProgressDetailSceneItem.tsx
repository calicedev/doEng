import React, { useState, useMemo, PropsWithChildren } from "react"
import ProgressDetailPhotoList from "./ProgressDetailPhotoList"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import IconButton from "components/UI/IconButton"
import { ProgressScene } from "hooks/queries/queries"
import defaultImg from "assets/images/default_img.png"
import Modal from "components/UI/Modal"

interface Props {
  scene: ProgressScene
}

function ProgressDetailSceneItem({ scene }: PropsWithChildren<Props>) {
  // 모달창 표시 여부
  const [isModal, setIsModal] = useState(false)

  const handleClick = () => {
    if (!scene.imageList) return
    setIsModal(true)
  }

  //photoCard.imageList[0].image
  return (
    <>
      <div className="flex-1 self-center relative">
        <div className="bg-white shadow-lg rotate-[8deg]">
          <div className="pb-[70%]"></div>
        </div>
        <div className="absolute top-0 left-0 w-full px-3 pt-3 pb-1 bg-white shadow-lg hover:rotate-[-3deg] duration-200 ease-in-out cursor-pointer">
          <div
            className={`relative soverflow-hidden pb-[60%]`}
            onClick={handleClick}
          >
            <img
              src={
                scene.imageList.length ? scene.imageList[0].image : defaultImg
              }
              alt="씬 대표 이미지"
              className={`absolute top-0 left-0 w-full h-full object-cover`}
            />
          </div>
          <div className="py-1 text-sm text-center">{scene.sceneTitle}</div>
        </div>
      </div>
      {isModal && (
        <Modal
          parentClasses="w-full mx-5 p-5 rounded bg-white bg-opacity-30 hover:bg-opacity-40"
          closeModal={() => setIsModal(false)}
        >
          {scene.imageList && (
            <ProgressDetailPhotoList imageList={scene.imageList} />
          )}
        </Modal>
      )}
    </>
  )
}

export default ProgressDetailSceneItem
