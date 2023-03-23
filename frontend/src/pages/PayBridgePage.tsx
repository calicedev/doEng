import LoadingComp from "components/UI/LoadingComp"
import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom"
import { useMutation, useQueryClient } from "react-query"
import apiRequest from "utils/axios"

const PayBridgePage = function () {
  const queryClient = useQueryClient()
  const { isSuccess } = useParams()
  const [SearchParams] = useSearchParams()
  const pg_token = SearchParams.get(`pg_token`)
  const navigate = useNavigate()

  const {} = useMutation(
    function () {
      return apiRequest({
        method: ``,
        url: ``,
      })
    },
    {
      onSuccess: function () {
        queryClient.invalidateQueries([`tale`, `taleId`]) // taleId를 redux로 관리!
        // 이후 리덕스 초기화!
      },
      onError: function () {
        // 리덕스 초기화!
      },
    },
  )

  const successPayment = function () {
    // 카카오로 보내서 tid? 를 받아오기.
  }

  // if (isSuccess === `fail`) {
  //   navigate(-2)
  //   // 실패하면 이전 페이지로 보내줘야 하기에, 이전 페이지 url을 갖고 있어야 할듯?
  //   return <>ㅎㅇ</>
  // }

  return (
    <>
      <LoadingComp />
      <div className="w-full h-full flex items-center justify-center">
        <div>ㅎㅇ</div>
      </div>
    </>
  )
}

export default PayBridgePage
