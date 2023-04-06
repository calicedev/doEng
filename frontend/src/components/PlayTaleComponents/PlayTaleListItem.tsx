import AnimationBox, { textOneByOnePpyong } from "components/UI/AnimationBox"
import { PlayTale } from "hooks/queries/queries"
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import Modal from "components/UI/Modal"
import PlayTaleDetail from "./PlayTaleDetail"
import { useStoreDispatch } from "hooks/useStoreSelector"
import { DispatchToast } from "store"
import { useWidthHeight } from "hooks/useWidthHwight"
import Lock from "../../assets/images/Lock.png"

interface PropsPlayTaleItem {
  tale: PlayTale
  animationOrder: number
}

const PlayTaleListItem = function ({
  tale,
  animationOrder,
}: PropsPlayTaleItem) {
  const dispatch = useStoreDispatch()
  const navigate = useNavigate()
  const [isModal, setIsModal] = useState<boolean>(false)
  const clickHandler = function () {
    if (tale.purchased) {
      setIsModal(() => true)
    } else {
      dispatch(
        DispatchToast(
          "구매가 필요한 컨텐츠 입니다!",
          false,
          `https://j8a601.p.ssafy.io/mypage/talestore/${tale.id}`,
        ),
      )
    }
  }
  const closeModal = function () {
    if (tale.purchased) {
      setIsModal(() => false)
    } else {
      dispatch(
        DispatchToast(
          "구매가 필요한 컨텐츠 입니다!",
          false,
          `https://j8a601.p.ssafy.io/mypage/talestore/${tale.id}`,
        ),
      )
    }
  }
  const [lockDown, setLockDown] = useState<boolean>(tale.purchased)
  const [lockDownClasses, setLockDownClasses] = useState<string>("")
  useEffect(
    function () {
      if (tale.purchased) {
        setLockDownClasses(() => "")
      } else {
        setLockDownClasses(() => "")
      }
    },
    [tale.purchased],
  )
  const imgRef = useRef<HTMLImageElement>(null)
  const { width: lockWidth, height: lockHeight } = useWidthHeight(imgRef)
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
        boxClasses={`basis-[24%] h-[50%] w-[24%] flex flex-col items-center rounded-[13px] flex items-center justify-center relative ${lockDownClasses}`}
        appearClassName={textOneByOnePpyong[animationOrder + 5]}
      >
        {tale.purchased ? null : (
          <div
            className={`absolute z-[101] cursor-pointer rounded-[13px] bg-black bg-opacity-50 flex items-center justify-center scale-[96%] duration-[0.33s] hover:bg-opacity-30 h-full w-auto px-[40%]`}
            style={{
              width: `${lockHeight * 0.7458449893}px`,
              // paddingLeft: `40%`,
              // paddingRight: `40%`,
            }}
            onClick={clickHandler}
          >
            <img
              ref={imgRef}
              alt="자물쇠"
              src={Lock}
              className="relative min-h-[50px] min-w-[50px] h-auto w-[20%] object-contain scale-[96%]"
              // className="absolute z-[101] h-[98%] px-[37%] py-[50%] bg-black bg-opacity-50 hover:bg-opacity-30 object-contain duration-[0.33s] scale-[96%] rounded-[13px]"
              // style={{
              //   width: `${lockHeight * 0.7458449893}px`,
              //   paddingLeft: `40%`,
              //   paddingRight: `40%`,
              // }}
            />
          </div>
        )}
        <img
          ref={imgRef}
          alt={`이미지aaa`}
          src={tale.backgroundImage}
          className={`absolute w-auto h-[98%] cursor-pointer rounded-[13px] object-contain shadow-lg hover:scale-100 scale-[96%] duration-[0.33s]`}
          onClick={clickHandler}
        />
      </AnimationBox>
    </>
  )
}

export default PlayTaleListItem
