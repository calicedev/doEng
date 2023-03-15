import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux"
import type { RootState, AppDispatch } from "../store"

/*
useSelector 및 useDispatch 타입 지정이 귀찮다면
해당 custom Hook을 사용해서 selector와 dispatch 해주면 된다.
*/

export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector
export const useStoreDispatch = function () {
  return useDispatch<AppDispatch>()
}

// // 커스텀 훅 사용 시 타입 선언 필요 없음.
// const exams = useStoreSelector((state) => state.example)
// // 일반 useSelector 사용 시 RootState 타입 선언 필요.
// const exams2 = useSelector((state: RootState) => state.example)
