import React from "react"

interface Word {
  engWord: string
  correctList: boolean[]
}

interface TestResult {
  testCount: number
  wordList: Word[]
}

interface TaleProps {
  taleTest: TestResult
}

function ProgressDetailTest({ taleTest }: TaleProps) {
  const wordTrueCounts: number[] = taleTest.wordList.map(
    (word: Word) => word.correctList.filter((value: boolean) => value).length,
  )

  const testTrueCounts: number[] = taleTest.wordList[0].correctList.map(
    (_, i) =>
      taleTest.wordList.reduce(
        (acc, word) => acc + (word.correctList[i] ? 1 : 0),
        0,
      ),
  )

  const totalWords: number = taleTest.wordList.length
  const totalTests: number = taleTest.testCount
  return (
    <div>
      <table className="table-auto border-collapse border-spacing-20 border-black border-4">
        <thead>
          <tr>
            <th>Result</th>
            {[...Array(taleTest.testCount)].map((_, i) => (
              <th
                key={i}
                className="border border-collapse border-black px-4 py-2"
              >
                {i + 1}회
              </th>
            ))}
            <th>정답률</th>
          </tr>
        </thead>
        <tbody>
          {taleTest.wordList.map((word) => (
            <tr key={word.engWord}>
              <td className="border border-collapse border-black px-4 py-2">
                {word.engWord}
              </td>
              {word.correctList.map((correct, i) => (
                <td
                  key={i}
                  className="border border-collapse border-black px-4 py-2"
                >
                  {correct.toString()}
                </td>
              ))}
              <td className="border border-collapse border-black px-4 py-2">
                {(
                  (wordTrueCounts[taleTest.wordList.indexOf(word)] /
                    totalTests) *
                  100
                ).toFixed(2)}
                %
              </td>
            </tr>
          ))}
          <tr>
            <td className="border border-collapse border-black px-4 py-2">
              점수
            </td>
            {testTrueCounts.map((count, i) => (
              <td
                key={i}
                className="border border-collapse border-black px-4 py-2"
              >
                {count}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ProgressDetailTest
