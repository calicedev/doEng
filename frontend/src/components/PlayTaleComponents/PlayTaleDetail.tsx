import { PlayTaleDetail, usePlayTaleDetail } from "hooks/queries/queries"
import { PropsWithChildren } from "react"
import { useNavigate } from "react-router-dom"

interface Props {
  taleId: number
  closeModal: () => void
}

const PlayTaleDetailCompo = function ({ taleId }: PropsWithChildren<Props>) {
  const navigate = useNavigate()
  const { data: PlayTaleDetailData } = usePlayTaleDetail(taleId)
  console.log(PlayTaleDetailData)
  const restartHandler = function () {
    // navigate()
  }
  const continueHandler = function () {
    // navigate()
  }
  const wordTestHandler = function () {}
  return (
    <>
      <div>ㅎㅇ</div>
      <div>ㅎㅇ</div>
      <div>ㅎㅇ</div>
      <div>ㅎㅇ</div>
    </>
  )
}

export default PlayTaleDetailCompo
