import React, { PropsWithChildren } from "react"
import MyPageButton from "components/MyPageComponents/common/MyPageButton"
import { useNavigate } from "react-router-dom"
import { ProgressTaleDetail } from "hooks/queries/queries"

interface Props {
  tale: ProgressTaleDetail
}

function ProgressDetailHeader({ tale }: PropsWithChildren<Props>) {
  const navigate = useNavigate()
  const toTaleDetail = () => {
    navigate(`/mypage/talestore/${tale.id}`)
  }

  return (
    <div className={`flex flex-col items-center gap-4`}>
      <div
        className={`overflow-hidden relative w-[80%] rounded drop-shadow-md`}
        style={{ paddingBottom: "110%" }}
      >
        <img
          src={tale.backgroundImage}
          className={`absolute top-0 left-0 w-full h-full object-cover`}
        />
      </div>
      <div className={`font-bold text-xl grid place-content-center p-3`}>
        {tale.title}
      </div>
      <MyPageButton text="책 상세" onClick={toTaleDetail} />
    </div>
  )
}

export default ProgressDetailHeader

// <a href={tale.backgroundImage} download>
//   <img src={tale.backgroundImage} alt="W3Schools" />
// </a>
