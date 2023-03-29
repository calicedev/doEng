import { FC, memo } from "react"
import { useCanvas } from "../../../hooks/useCanvas"
import { LTO, LTOInterface } from "./LinearTrackingObj"
// import { SecondWaveBackground } from "./SecondWaveBackground"
const colors = [
  "rgba(255, 245, 208, 0.7)",
  "rgba(255, 231, 137, 0.7)",
  "rgba(250, 190, 56, 0.7)",
  "rgba(254, 212, 65, 0.7)",
]
interface waveProps {
  canvasWidth: number
  canvasHeight: number
  bgColor?: string
}

const MouseTracking: FC<waveProps> = function ({
  canvasWidth,
  canvasHeight,
  bgColor = "",
}) {
  const fillBackground = function (ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  }
  let objts: LTOInterface[] = []
  for (let i = 0; i < 1000; i++) {
    let MTOOBJ = new LTO(canvasWidth, canvasHeight, colors[i % 4])
    objts.push(MTOOBJ)
  }

  const animate = function (ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    if (bgColor !== "") {
      fillBackground(ctx)
    }
    objts.forEach((obj) => {
      obj.draw(ctx)
    })
  }

  const canvasRef = useCanvas(canvasWidth, canvasHeight, animate)
  return <canvas ref={canvasRef} />
}

export default memo(MouseTracking)
