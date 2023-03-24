import { useQueryClient } from "react-query"

const keyGuide = [
  `대분류: user || scene`, // scene의 경우, [scene, taleId, sceneOrder] 형태의 key
  `if user : game || store`,
  `if game: progress || play || card || test`,
  `if store: list || detail || reviews`,
  `리스트or상세: list || detail`,
]
let queryKeyMap = `
Query Key               // Mutation invalidate

user                    // 로그인 로그아웃, 구매
  ㄴgame                // 단어 테스트, 게임진행기록
    ㄴprogress          // 이미지 저장
      ㄴlist
      ㄴdetail
    ㄴplay              // 스테이지 저장
      ㄴlist
      ㄴdetail
    ㄴword
      ㄴlist
  ㄴstore               // review 작성/수정/삭제 시
    ㄴlist
    ㄴdetail
    ㄴreviews
scene
  ㄴtaleId
    ㄴsceneOrder
`
export const queryKeys = {
  ////////////
  /* 최상단 */
  ////////////
  user: () => [`user`] as const,
  sceneList: (taleId: number) => [...queryKeys.user(), taleId] as const,
  sceneDetail: (taleId: number, sceneOrder: number) => [
    ...queryKeys.user(),
    taleId,
    sceneOrder,
  ], // 최상단

  ///////////////
  /* user 하위 */
  ///////////////
  game: () => [...queryKeys.user(), `game`] as const,
  store: () => [...queryKeys.user(), `store`] as const,

  ///////////////
  /* game 하위 */
  ///////////////
  progress: () => [...queryKeys.game(), `progress`] as const,
  play: () => [...queryKeys.game(), `play`] as const,
  word: () => [...queryKeys.game(), `word`] as const,

  ///////////////////
  /* progress 하위 */
  ///////////////////
  progressList: () => [...queryKeys.progress(), `list`] as const,
  progressDetail: (taleId: number) =>
    [...queryKeys.progress(), `detail`, taleId] as const,

  ///////////////////
  /* play 하위 */
  ///////////////////
  playList: () => [...queryKeys.play(), `list`] as const,
  playDetail: (taleId: number) =>
    [...queryKeys.play(), `detail`, taleId] as const,

  ///////////////////
  /* word 하위 */
  ///////////////////
  wordList: () => [...queryKeys.word(), `list`] as const,

  ////////////////
  /* store 하위 */
  ////////////////
  storeList: () => [...queryKeys.store(), `list`] as const,
  storeDetail: (taleId: number) =>
    [...queryKeys.store(), `detail`, taleId] as const,
  reviewList: (taleId: number) =>
    [...queryKeys.storeDetail(taleId), `reviews`] as const,
}
