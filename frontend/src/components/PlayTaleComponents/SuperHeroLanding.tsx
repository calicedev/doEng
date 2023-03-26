import Background from "../../assets/images/Background.png"
import BookStand from "../../assets/images/BookStand.png"
import LeftTreeLeaves from "../../assets/images/left_wood_leaves.png"
import LeftWood from "../../assets/images/left_wood.png"
import LeftBottom from "../../assets/images/left_leaves.png"
import LeftLeaf from "../../assets/images/left_leaf.png"
import RightTreeLeaves from "../../assets/images/right_wood_leaves.png"
import RightWood from "../../assets/images/right_wood.png"
import RightBottom from "../../assets/images/right_leaves.png"
import RightLeaf from "../../assets/images/right_leaf.png"
import AnimationBox from "components/UI/AnimationBox"
import { PropsWithChildren } from "react"

const SuperHeroLanding = function ({ children }: PropsWithChildren) {
  return (
    <div className="canvas-under-bg-container h-full w-full flex items-center justify-center">
      <AnimationBox
        boxClasses="bg-vegis absolute top-0 left-0 w-[36%]"
        appearClassName="animate-[appear-from-left-with-bounce_0.33s_both]"
      >
        <img alt="좌상단" src={LeftTreeLeaves} className="w-full" />
      </AnimationBox>
      <AnimationBox
        boxClasses="bg-vegis absolute left-0 w-[20%]"
        appearClassName="animate-[appear-from-left-with-bounce_0.33s_both]"
      >
        <img alt="좌나무" src={LeftWood} className="w-full" />
      </AnimationBox>
      <AnimationBox
        boxClasses="bg-vegis absolute right-0 top-0 w-[39.5%]"
        appearClassName="animate-[appear-from-right-with-bounce_0.33s_both]"
      >
        <img alt="우상단" src={RightTreeLeaves} className="w-full scale-110" />
      </AnimationBox>
      <AnimationBox
        boxClasses="bg-vegis absolute right-0 w-[20%]"
        appearClassName="animate-[appear-from-right-with-bounce_0.33s_both]"
      >
        <img alt="우나무" src={RightWood} className="w-full" />
      </AnimationBox>
      {children}
      <AnimationBox
        boxClasses="bg-vegis absolute right-0 bottom-0 w-[20%]"
        appearClassName="animate-[appear-from-right-with-bounce_0.33s_both]"
      >
        <img
          alt="우잎"
          src={RightLeaf}
          className="w-full animate-salangsalang-right"
        />
      </AnimationBox>
      <AnimationBox
        boxClasses="bg-vegis absolute right-0 bottom-0 w-[28%]"
        appearClassName="animate-[appear-from-right-with-bounce_0.33s_0.9s_both]"
      >
        <img alt="우하단" src={RightBottom} className="w-full" />
      </AnimationBox>
      <AnimationBox
        boxClasses="bg-vegis absolute left-0 bottom-0 w-[20%]"
        appearClassName="animate-[appear-from-left-with-bounce_0.33s_both]"
      >
        <img
          alt="좌잎"
          src={LeftLeaf}
          className="w-full animate-salangsalang-left"
        />
      </AnimationBox>
      <AnimationBox
        boxClasses="bg-vegis absolute left-0 bottom-0 w-[28%]"
        appearClassName="animate-[appear-from-left-with-bounce_0.33s_0.9s_both]"
      >
        <img alt="좌하단" src={LeftBottom} className="w-full" />
      </AnimationBox>
    </div>
  )
}

export default SuperHeroLanding
