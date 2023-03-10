import { PropsWithChildren, MouseEvent } from 'react'
import ReactDOM from 'react-dom'
import { ImCross } from 'react-icons/im'

interface Props {
  closeModal: () => void
}

function Modal({ closeModal, children }: PropsWithChildren<Props>) {
  return (
    <>
      {ReactDOM.createPortal(
        <>
          <div
            onClick={closeModal}
            className={`flex justify-center items-center absolute z-50 top-0 right-0 bg-black bg-opacity-50 w-full h-full`}
          >
            <div onClick={(e) => e.stopPropagation()}>{children}</div>
          </div>
        </>,
        document.getElementById('overlay-root')!,
      )}
    </>
  )
}

export default Modal

// <div
//   onClick={onClickHandle}
//   className={`absolute top-2 right-2 text-lg text-gray-50`}
// >
//   <ImCross />
// </div>
// <div
// onClick={(e) => e.stopPropagation()}
// className={`overflow-y-auto relative min-w-[300px] max-w-[90vw] max-h-[90vh] p-5 rounded bg-white bg-opacity-20`}
// >
// {children}
// </div>
