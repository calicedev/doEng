import React, { PropsWithChildren } from "react"
import MyPageButton from "components/MyPageComponents/common/MyPageButton"
import { useNavigate } from "react-router-dom"
import { ProgressTaleDetail } from "hooks/queries/queries"

interface Props {
  tale: ProgressTaleDetail
}

function ProgressDetail({ tale }: PropsWithChildren<Props>) {
  const navigate = useNavigate()
  const toTaleDetail = () => {
    navigate(`/mypage/talestore/${tale.id}`)
  }

  return (
    <div>
      <div>
        <img src={tale.backgroundImage} alt="progressDetailBackground" />
        <div className={`font-bold text-xl grid place-content-center p-3`}>
          {tale.title}
        </div>
        <div className={`grid place-content-center p-2`}>
          <MyPageButton text="책 상세" onClick={toTaleDetail} />
        </div>
      </div>
    </div>
  )
}

export default ProgressDetail

// <a href={tale.backgroundImage} download>
//   <img src={tale.backgroundImage} alt="W3Schools" />
// </a>
