import AnimationBox from "components/UI/AnimationBox"

interface Tale {
  backgroundImage: string
  id: number
  purchased: boolean
  score: number
  title: string
}

interface PropsPlayTaleItem {
  tale: Tale
}

const PlayTaleListItem = function ({ tale }: PropsPlayTaleItem) {
  return (
    <AnimationBox boxClasses="basis-[32%] h-[60%] bg-lime-300 flex flex-col items-center">
      <img alt={`이미지`} src={tale.backgroundImage} />
    </AnimationBox>
  )
}

export default PlayTaleListItem
