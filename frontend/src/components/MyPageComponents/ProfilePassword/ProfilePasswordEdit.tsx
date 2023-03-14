import MyPageButton from "components/MyPageComponents/common/MyPageButton"
import { useNavigate } from "react-router-dom"

function ProfilePasswordEdit() {
  const navigate = useNavigate()

  return (
    <div>
      <div>ProfilePasswordEdit</div>
      <MyPageButton
        color={`orange`}
        onClick={() => {
          navigate(`/mypage/profile/edit`)
        }}
      >
        회원정보 수정
      </MyPageButton>
    </div>
  )
}

export default ProfilePasswordEdit
