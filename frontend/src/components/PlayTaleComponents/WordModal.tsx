import React, { FC, PropsWithChildren } from "react"
import { Word } from "hooks/queries/queries"
import AnimationBox from "components/UI/AnimationBox"

interface Props {
  word: Word
}

const WordModal = function ({ word }: PropsWithChildren<Props>) {
  return (
    <AnimationBox>
      <div className="flex flex-col items-center px-16 py-10 bg-yellow-100 rounded-xl">
        <img
          src={word.image}
          alt={"단어 이미지"}
          className={`w-[200px] h-auto bg-contain bg-center bg-no-repeat cursor-pointer`}
        />
        <div className="text-3xl mb-3">{word.engWord}</div>
        <div className="text-3xl">{word.korWord}</div>
      </div>
    </AnimationBox>
  )
}

export default WordModal
