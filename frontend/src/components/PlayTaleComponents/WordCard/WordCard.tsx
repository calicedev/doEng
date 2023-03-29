import React, { PropsWithChildren } from "react"
import { Word } from "hooks/queries/queries"

interface Props {
  word: Word
}

function WordCard({ word }: PropsWithChildren<Props>) {
  return (
    <div>
      {word.engWord}
      <img src={word.image} /> 이미지{" "}
    </div>
  )
}

export default WordCard
