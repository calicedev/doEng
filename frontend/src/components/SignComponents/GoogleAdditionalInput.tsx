import { useUserData } from "hooks/queries/queries"
import { useNavigate } from "react-router-dom"

const GoogleAdditionalInput = function () {
  const navigate = useNavigate()
  const { data: userData } = useUserData()
  if (userData?.id && userData?.nickname) {
    navigate("/")
  }
  return (
    <div>
      <div>하이요</div>
      <div>하이요</div>
      <div>하이요</div>
      <div>하이요</div>
    </div>
  )
}

export default GoogleAdditionalInput
