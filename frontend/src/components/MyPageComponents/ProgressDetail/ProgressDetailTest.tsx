import React, {
  PropsWithChildren,
  useRef,
  useMemo,
  useEffect,
  useState,
} from "react"
import { ProgressTestResult, WordList } from "hooks/queries/queries"
import { useWidthHeight } from "hooks/useWidthHwight"
import AnimationBox from "components/UI/AnimationBox"

interface Props {
  testResult: ProgressTestResult
}

function ProgressDetailTest({ testResult }: PropsWithChildren<Props>) {
  // 단어 당 맞은 갯수를 세서 배열로 반환
  const wordTrueCounts: number[] = testResult.wordList?.map(
    (word: WordList) =>
      word.correctList?.filter((value: boolean) => value).length,
  )

  // 테스트 당 맞은 갯수를 세서 배열로 반환
  const testTrueCounts: number[] = testResult.wordList[0]?.correctList?.map(
    (_, i) =>
      testResult.wordList.reduce(
        (acc, word) => acc + (word.correctList[i] ? 1 : 0),
        0,
      ),
  )

  const totalTests: number = Math.max(testResult.testCount, 1)
  return (
    <div className="w-full h-full pb-7">
      <AnimationBox appearClassName="animate-appear-from-bottom-fast">
        <div className={`font-bold mb-2`}>단어 테스트</div>
      </AnimationBox>
      <div className="overflow-scroll w-full h-full p-2">
        <AnimationBox appearClassName="animate-appear-from-bottom-fast">
          <table className="table-auto border-collapse border-[3px] border-orange-400 text-base text-center whitespace-nowrap">
            <thead>
              <tr>
                <th className="bg-orange-200">Result</th>
                {[...Array(testResult.testCount)].map((_, i) => (
                  <th
                    key={`${i}th-test`}
                    className=" bg-orange-200 border-[3px] border-orange-400 px-3 py-2"
                  >
                    {i + 1}회
                  </th>
                ))}
                <th className="bg-orange-200 border-[3px] border-orange-400">
                  정답률
                </th>
              </tr>
            </thead>
            <tbody>
              {testResult.wordList.map((word, i) => (
                <tr key={`${word.engWord}-${i}`}>
                  <td className="border-[3px] border-orange-400 px-3 py-2">
                    {word.engWord}
                  </td>
                  {word.correctList.map((correct, j) => (
                    <td
                      key={`${word.engWord}-${i}-${j}th`}
                      className="border-[3px] border-orange-400 px-3 py-2"
                    >
                      {correct ? "O" : "X"}
                    </td>
                  ))}
                  <td className="border-[3px] border-orange-400 px-3 py-2">
                    {(
                      (wordTrueCounts[testResult.wordList.indexOf(word)] /
                        totalTests) *
                      100
                    ).toFixed(2)}
                    %
                  </td>
                </tr>
              ))}
              <tr>
                <td className="border-[3px] border-collapse border-orange-400 px-3 py-2">
                  점수
                </td>
                {testTrueCounts?.map((count, i) => (
                  <td
                    key={i}
                    className="border-[3px] border-collapse border-orange-400 px-3 py-2"
                  >
                    {count}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </AnimationBox>
      </div>
    </div>
  )
}

export default ProgressDetailTest
