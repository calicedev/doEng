import { configureStore, combineReducers } from "@reduxjs/toolkit"
// import {getDefaultMiddleware} from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"
import axios, { AxiosResponse } from "axios"
// import thunk from "redux-thunk"
import exampleSlice, { exActions } from "./example-slice"
import tokenSlice, { tokenActions } from "./tokenSlice"
import toastSlice, { toastActions } from "./toastSlice"
import findSlice from "./findSlice"

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

const rootReducers = combineReducers({
  example: exampleSlice,
  token: tokenSlice,
  toast: toastSlice,
  find: findSlice,
})

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ["example"], // persist로 유지 할 값들
  // blacklist: ["example"], // persist에서 제외 할 것들
}

const persistedReducer = persistReducer(persistConfig, rootReducers)

const store = configureStore({
  reducer: persistedReducer,
  // middleware: [thunk],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

/*
Action Creator의 경우, useApi를 통해 마찬가지로 사용이 가능하지만,
명확하게 해당 redux를 건드린다는 것을 보여주기 위해 action creator를 선언해서 사용한다.
액션 크리에이터 생성 시, 함수 이름에 slice 이름을 적어서 명확하게 표현하자.
혹은 컨벤션을 맞춰서 공통으로 사용하면 좋을 것 같다.
*/

// action creator 예시.
export const AxiosExample = function (requestData: object) {
  return async function (dispatch: AppDispatch) {
    axios(requestData).then((res: AxiosResponse) => {
      console.log(res.data)
      dispatch(exActions.changeEx({ exval: "바뀜" }))
    })
  }
}

export const DispatchToast = function (message: string, isSuccess: boolean) {
  return async function (dispatch: AppDispatch) {
    dispatch(toastActions.toastOff({}))
    dispatch(toastActions.setToastMessage({ message: message }))
    dispatch(toastActions.setIsSuccess({ isSuccess: isSuccess }))
    dispatch(toastActions.setToast({}))
    setTimeout(function () {
      dispatch(toastActions.toastOff({}))
    }, 4000)
  }
}

export default store
