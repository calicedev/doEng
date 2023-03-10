import React from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

function ProgressDetailPhotoModal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div>
      <div onClick={onClose} />
      <div>
        <button onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  )
}

export default ProgressDetailPhotoModal
