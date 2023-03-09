import React from 'react'

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
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Result</th>
            {[...Array(taleTest.testCount)].map((_, i) => (
              <th key={i}>{i + 1}회</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {taleTest.wordList.map((word) => (
            <tr key={word.engWord}>
              <td>{word.engWord}</td>
              {word.correctList.map((correct, i) => (
                <td key={i}>{correct.toString()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProgressDetailTest
