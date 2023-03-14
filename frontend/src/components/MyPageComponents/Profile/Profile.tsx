import dummy from "components/MyPageComponents/DummyData/Profile.json"

function Profile() {
  return (
    <div>
      <div>회원정보</div>
      <div></div>
      <div>이름</div>
      <div>{dummy.name}</div>
    </div>
  )
}

export default Profile
