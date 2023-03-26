import AnimationBox from "components/UI/AnimationBox"
import { PlayTale } from "hooks/queries/queries"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Modal from "components/UI/Modal"

interface PropsPlayTaleItem {
  tale: PlayTale
}

const PlayTaleListItem = function ({ tale }: PropsPlayTaleItem) {
  const navigate = useNavigate()
  const [isModal, setIsModal] = useState<boolean>(false)
  const clickHandler = function () {
    setIsModal(() => true)
  }
  const closeModal = function () {
    setIsModal(() => false)
  }
  return (
    <>
      {isModal && (
        <Modal closeModal={closeModal}>
          <div>모달 하이용</div>
        </Modal>
      )}
      <AnimationBox boxClasses="basis-[24%] h-[50%] flex flex-col bg-lime-300 items-center rounded-[13px] border-[3px] border-black shadow-lg flex items-center justify-center">
        <img
          alt={`이미지aaa`}
          src={tale.backgroundImage}
          className="w-full cursor-pointer rounded-[13px]"
          onClick={clickHandler}
        />
      </AnimationBox>
    </>
  )
}

export default PlayTaleListItem
