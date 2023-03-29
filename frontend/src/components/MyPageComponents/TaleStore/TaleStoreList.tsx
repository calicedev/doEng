import TaleStoreItem from "components/MyPageComponents/TaleStore/TaleStoreItem"
import AnimationBox, { textOneByOne } from "components/UI/AnimationBox"
import CommonLoading from "components/UI/CommonLoading"
import { useStoreTaleList } from "hooks/queries/queries"

////////////////////////////////////////////////////////////////
// react query 사용해보기
const TaleStoreList = function () {
  const {
    isLoading: taleLoading,
    error: taleError,
    data: tale,
  } = useStoreTaleList()
  // console.log(tale)

  if (taleLoading) {
    return <CommonLoading></CommonLoading>
  }
  if (!tale) {
    return <div>잘못된 접근입니다.</div>
  }

  return (
    <>
      {taleLoading ? (
        <div>로딩 중</div>
      ) : tale ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {tale?.map((tale, idx) => (
            <AnimationBox appearClassName={`${textOneByOne[idx]}`}>
              <TaleStoreItem key={`tale-${tale.id}`} tale={tale} />
            </AnimationBox>
          ))}
        </div>
      ) : (
        <div>잘못된 접근입니다.</div>
      )}
    </>
  )
}

export default TaleStoreList
