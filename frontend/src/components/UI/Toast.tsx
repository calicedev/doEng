import { PropsWithChildren } from "react"
import {
  useStoreDispatch,
  useStoreSelector,
} from "../../hooks/useStoreSelector"
import ReactDOM from "react-dom"
import AnimationBox from "./AnimationBox"
import { toastActions } from "store/toastSlice"
import styles from "./Toast.module.css"

interface Props {
  message?: string
}

const Smile = function () {
  return (
    <>
      <div
        className={`${
          styles[`face`]
        } max-w-[60px] max-h-[60px] min-w-[60px] min-h-[60px] translate-y-[10%]`}
      >
        <div className={`${styles[`eye`]}`}></div>
        <div className={`${styles[`eye`]} ${styles[`right`]}`}></div>
        <div className={`${styles[`mouth`]} ${styles[`happy`]}`}></div>
      </div>
      <div className={`${styles[`shadow`]} ${styles[`scale`]}`}></div>
    </>
  )
}
const Sad = function () {
  return (
    <>
      <div
        className={`${
          styles[`face2`]
        } max-w-[60px] max-h-[60px] min-w-[60px] min-h-[60px] translate-y-[10%]`}
      >
        <div className={`${styles[`eye`]}`}></div>
        <div className={`${styles[`eye`]} ${styles[`right`]}`}></div>
        <div className={`${styles[`mouth`]} ${styles[`sad`]}`}></div>
      </div>
      <div className={`${styles[`shadow`]} `}></div>
    </>
  )
}

const Toast = function ({ children }: PropsWithChildren<Props>) {
  const {
    isToast,
    isSuccess,
    message: toastMessage,
  } = useStoreSelector((state) => state.toast)
  const dispatch = useStoreDispatch()
  const closeToast = function () {
    dispatch(toastActions.toastOff({}))
  }

  return (
    <>
      {ReactDOM.createPortal(
        <AnimationBox
          isOpened={isToast}
          boxClasses={`box-border fixed w-[31%] h-[14.5%] z-[100] flex justify-center items-center bottom-[0%] left-[50%]`}
        >
          <div
            className={`box-border w-full h-full rounded-[8px] flex flex-row items-center justify-center z-[100] translate-x-[-50%] translate-y-[-30%] p-2 bg-[#FFFEE1] shadow-2xl drop-shadow-2xl duration-[0.33s] active:bg-[#F4F2C3]`}
            onClick={closeToast}
          >
            <div
              className={`box-border flex flex-row items-center justify-evenly w-full h-full rounded-[8px] border-[6px] border-[#FEDEAC] bg-[#FFFEE1] duration-[0.33s] active:bg-[#F4F2C3]`}
            >
              <div
                className={`box-border basis-[32%] w-[32%] h-full flex flex-col items-center justify-center gap-1`}
              >
                {isSuccess ? <Smile /> : <Sad />}
              </div>
              <div
                className={`basis-[68%] w-[68%] flex font-hopang-black text-[1.9rem] items-center justify-center`}
              >
                {toastMessage}
              </div>
            </div>
          </div>
        </AnimationBox>,
        document.getElementById("backdrop-root")!,
      )}
    </>
  )
}

export default Toast
