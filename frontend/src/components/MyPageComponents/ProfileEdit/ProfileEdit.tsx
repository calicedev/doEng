import MyPageButton from "components/MyPageComponents/common/MyPageButton"
import { useNavigate } from "react-router-dom"

function ProfileEdit() {
  const navigate = useNavigate()
  const pushProfilePassword = () => {
    navigate(`/mypage/profile/password`)
  }

  return (
    <div>
      <div>ProfileEdit</div>
      <MyPageButton color={`orange`} onClick={pushProfilePassword}>
        비밀번호 수정
      </MyPageButton>
    </div>
  )
}

export default ProfileEdit
