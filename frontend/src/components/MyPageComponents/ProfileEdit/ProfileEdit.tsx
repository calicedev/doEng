import MyPageButton from "components/MyPageComponents/common/MyPageButton"
import { useNavigate } from "react-router-dom"

function ProfileEdit() {
  const navigate = useNavigate()

  return (
    <div>
      <div>ProfileEdit</div>
      <MyPageButton
        color={`orange`}
        onClick={() => {
          navigate(`/mypage/profile/password`)
        }}
      >
        비밀번호 수정
      </MyPageButton>
    </div>
  )
}

export default ProfileEdit
