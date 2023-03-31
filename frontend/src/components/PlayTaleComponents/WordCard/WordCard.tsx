import React, { PropsWithChildren } from "react"
import { Word } from "hooks/queries/queries"
import wordcard from "assets/images/wordcard.png"

interface Props {
  word: Word
}

function WordCard({ word }: PropsWithChildren<Props>) {
  return (
    <div>
      {word.engWord}
      <img alt="단어카드" src={wordcard} className="w-[90%] h-[90%]" />
      <img src={word.image} className="" />
    </div>
  )
}

export default WordCard
