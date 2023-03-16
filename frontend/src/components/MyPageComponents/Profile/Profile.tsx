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

  const pushHomePage = () => {
    navigate(`/`)
  }

  const pushProfileEdit = () => {
    navigate(`/mypage/profile/edit`)
  }

  return (
    <div>
      <div className={`flex`}>
        <div className={`font-extrabold`}>회원정보</div>
        <div>
          <MyPageButton color={`orange`} onClick={openModal}>
            회원탈퇴
          </MyPageButton>
          {isModal && (
            <Modal closeModal={() => setIsModal(false)}>
              <div className={` h-52 w-96 p-4 bg-yellow-100`}>
                <div className={`text-2xl font-bold text-center mt-4 mb-10`}>
                  회원 탈퇴 하시겠습니까?
                </div>
                <div className={`flex flex-row`}>
                  <div className={`basis-1/4`}></div>
                  <div className={`basis-1/4`}>
                    <MyPageButton color={`orange`} onClick={pushHomePage}>
                      {" "}
                      예{" "}
                    </MyPageButton>
                  </div>
                  <div className={`basis-1/4`}>
                    <MyPageButton color={`orange`} onClick={closeModal}>
                      아니오
                    </MyPageButton>
                  </div>
                </div>
              </div>
            </Modal>
          )}
        </div>
        <div>
          <MyPageButton color={`orange`} onClick={pushProfileEdit}>
            회원정보 수정
          </MyPageButton>
        </div>
      </div>
      <div
        className={` box-border h-2 w-11/12 border-orange-600 bg-orange-600 m-4 `}
      ></div>
      <div className={`flex mt-3`}>
        <div className={` font-bold mr-3`}>이름</div>
        <div
          className={`font-bold box-border  h-8 w-1/4 rounded-lg shadow-md bg-white pl-3 mr-5 `}
        >
          {dummy.name}
        </div>
        <div className={` font-bold mr-3`}>닉네임</div>
        <div
          className={`font-bold box-border  h-8 w-1/4 rounded-lg shadow-md bg-white pl-3`}
        >
          {dummy.nickname}
        </div>
      </div>
      <div className={`flex mt-3`}>
        <div className={` font-bold mr-3`}>아이디</div>
        <div
          className={` font-bold box-border  h-8 w-1/4 rounded-lg shadow-md bg-white pl-3`}
        >
          {dummy.memberId}
        </div>
      </div>
      <div className={`flex mt-3`}>
        <div className={` font-bold mr-3`}>이메일</div>
        <div
          className={`font-bold box-border  h-8 w-1/4 rounded-lg shadow-md bg-white pl-3 `}
        >
          {dummy.email}
        </div>
      </div>
      <div className={`flex mt-3`}>
        <div className={` font-bold mr-3`}>핸드폰 번호</div>
        <div
          className={`font-bold box-border  h-8 w-1/4 rounded-lg shadow-md bg-white pl-3 `}
        >
          {dummy.phone}
        </div>
      </div>
    </div>
  )
}

export default Profile
