import AnimationBox from "components/UI/AnimationBox"
import { PlayTale } from "hooks/queries/queries"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Modal from "components/UI/Modal"
import PlayTaleDetail from "./PlayTaleDetail"

interface PropsPlayTaleItem {
  tale: PlayTale
  animationOrder: number
}

const animationOrders = {}

const PlayTaleListItem = function ({ tale }: PropsPlayTaleItem) {
  const navigate = useNavigate()
  const [isModal, setIsModal] = useState<boolean>(false)
  const clickHandler = function () {
    setIsModal(() => true)
  }
  const closeModal = function () {
    setIsModal(() => false)
  }
  const [lockDown, setLockDown] = useState<boolean>(tale.purchased)
  const [lockDownClasses, setLockDownClasses] = useState<string>("")
  useEffect(
    function () {
      if (tale.purchased) {
        setLockDownClasses(() => "bg-white")
      } else {
        setLockDownClasses(() => "lock-down-box bg-black")
      }
    },
    [tale.purchased],
  )
  return (
    <>
      {isModal && (
        <Modal
          closeModal={closeModal}
          parentClasses={`h-[90%] w-[90%] flex items-center justify-center`}
        >
          <PlayTaleDetail taleId={tale.id} closeModal={closeModal} />
        </Modal>
      )}
      <AnimationBox
        boxClasses={`basis-[24%] h-[50%] flex flex-col items-center rounded-[13px] border-[3px] border-black shadow-lg flex items-center justify-center ${lockDownClasses}`}
        appearClassName={`animate-[ppyong_0.22s_0.44s_both]`}
      >
        <img
          alt={`이미지aaa`}
          src={tale.backgroundImage}
          className={`w-full cursor-pointer rounded-[13px]`}
          onClick={clickHandler}
        />
      </AnimationBox>
    </>
  )
}

export default PlayTaleListItem
