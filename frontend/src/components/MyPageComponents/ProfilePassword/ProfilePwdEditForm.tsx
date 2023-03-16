import MyPageButton from "components/MyPageComponents/common/MyPageButton"
import { useNavigate } from "react-router-dom"
import MyPageInput from "../common/MyPageInput"

function ProfilePwdEditForm() {
  return (
    <div className="flex flex-col gap-10 p-10">
      <MyPageInput type="originalPwd" value={""} />
      <MyPageInput type="newPwd" value={""} />
      <MyPageInput type="confirmPwd" value={""} />
    </div>
  )
}

export default ProfilePwdEditForm
