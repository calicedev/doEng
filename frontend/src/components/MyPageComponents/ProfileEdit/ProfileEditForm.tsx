import MyPageButton from "components/MyPageComponents/common/MyPageButton"
import { useInput } from "hooks/useInput"
import { useNavigate } from "react-router-dom"
import MyPageInput from "../common/MyPageInput"

function ProfileEditForm() {
  // const user = useSelector((state) => state.user)
  const user = exData

  return (
    <div className="flex flex-col gap-10 p-10">
      <div className="flex gap-10">
        <MyPageInput type="name" value={user.name} disabled={true} />
        <MyPageInput type="nickname" value={user.nickname} disabled={true} />
      </div>
      <MyPageInput type="id" value={user.memberId} disabled={true} />
      <MyPageInput type="email" value={user.email} disabled={true} />
      <MyPageInput type="phone" value={user.phone} disabled={true} />
    </div>
  )
}

export default ProfileEditForm

const exData = {
  id: 1,
  memberId: "doeng1",
  email: "abcd@gmail.com",
  nickname: "두잉",
  name: "홍길동",
  phone: "010-8832-2029",
  createdAt: "2017-09-11",
}
