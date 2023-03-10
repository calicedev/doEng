import { PropsWithChildren, useEffect } from "react"
import ReactDOM from "react-dom"

interface Props {
  closeModal: () => void
}

function Modal({ closeModal, children }: PropsWithChildren<Props>) {
  return (
    <>
      {ReactDOM.createPortal(
        <>{children}</>,
        document.getElementById("overlay-root")!,
      )}
    </>
  )
}

export default Modal
