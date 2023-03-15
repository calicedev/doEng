import MyPageButton from "components/MyPageComponents/common/MyPageButton"
import { useNavigate } from "react-router-dom"

function ProfilePasswordEdit() {
  const navigate = useNavigate()
  const pushProfileEdit = () => {
    navigate(`/mypage/profile/edit`)
  }

  return (
    <div>
      <div>ProfilePasswordEdit</div>
      <MyPageButton color={`orange`} onClick={pushProfileEdit}>
        회원정보 수정
      </MyPageButton>
    </div>
  )
}

export default ProfilePasswordEdit
