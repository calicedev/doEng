import dummy from "components/MyPageComponents/DummyData/Profile.json"
import MyPageButton from "components/MyPageComponents/common/MyPageButton"
import { useNavigate } from "react-router-dom"
import React, { useState } from "react"
import Modal from "components/UI/Modal"

function Profile() {
  const navigate = useNavigate()
  const [isModal, setIsModal] = useState(false)

  const openModal = () => {
    setIsModal(true)
  }

  const closeModal = () => {
    setIsModal(false)
  }

  return (
    <div>
      <div>회원정보</div>
      <div>
        <MyPageButton color={`orange`} onClick={openModal}>
          회원탈퇴
        </MyPageButton>
        {isModal && (
          <Modal closeModal={() => setIsModal(false)}>
            회원 탈퇴 하시겠습니까?
            <MyPageButton
              color={`orange`}
              onClick={() => {
                navigate(`/`)
              }}
            >
              {" "}
              예{" "}
            </MyPageButton>
            <MyPageButton color={`orange`} onClick={closeModal}>
              아니오
            </MyPageButton>
          </Modal>
        )}
      </div>
      <div>
        <MyPageButton
          color={`orange`}
          onClick={() => {
            navigate(`/mypage/profile/edit`)
          }}
        >
          회원정보 수정
        </MyPageButton>
      </div>
      <div>이름</div>
      <div
        className={` box-border  h-8 w-1/4 border-slate-100 border-2 rounded-lg shadow-lg bg-white `}
      >
        {dummy.name}
      </div>
    </div>
  )
}

export default Profile
