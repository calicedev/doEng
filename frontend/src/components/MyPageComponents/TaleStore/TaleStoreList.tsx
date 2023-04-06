import { useStoreTaleList } from "hooks/queries/queries"
import { useStoreDispatch } from "hooks/useStoreSelector"
import { DispatchToast } from "store"
import CommonLoading from "components/UI/CommonLoading"
import AnimationBox, { textOneByOne } from "components/UI/AnimationBox"
import TaleStoreItem from "components/MyPageComponents/TaleStore/TaleStoreItem"

const TaleStoreList = function () {
  const dispatch = useStoreDispatch()
  const {
    isLoading: taleLoading,
    error: taleError,
    data: taleList,
  } = useStoreTaleList()

  if (taleError) {
    dispatch(DispatchToast("동화책 정보를 불러오지 못했습니다.", false))
  }

  return (
    <>
      {taleLoading ? (
        <CommonLoading />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {taleList?.map((tale, idx) => (
            <AnimationBox
              appearClassName={`${textOneByOne[idx]}`}
              key={`tale-store-items-${tale.id}`}
            >
              <TaleStoreItem key={`tale-${tale.id}`} tale={tale} />
            </AnimationBox>
          ))}
        </div>
      )}
    </>
  )
}

export default TaleStoreList
