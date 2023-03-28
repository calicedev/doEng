import React, { PropsWithChildren } from "react"
import { Word } from "hooks/queries/queries"

interface Props {
  word: Word
}

function WordCard({ word }: PropsWithChildren<Props>) {
  return <div>{word.engWord}</div>
}

export default WordCard
