import { FC, memo } from "react"
import { useCanvas } from "../../../hooks/useCanvas"
import { MTO, MTOInterface } from "./MouseTrackingObject"
// import { SecondWaveBackground } from "./SecondWaveBackground"
const colors = [
  "rgba(22, 22, 22, 0.7)",
  "rgba(88, 88, 88, 0.7)",
  "rgba(166, 166, 166, 0.7)",
  "rgba(233, 233, 233, 0.7)",
]
interface waveProps {
  canvasWidth: number
  canvasHeight: number
}

const MouseTracking: FC<waveProps> = function ({ canvasWidth, canvasHeight }) {
  const fillBackground = function (ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "rgba(249, 170, 70, 1)"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  }
  let objts: MTOInterface[] = []
  for (let i = 0; i < 1000; i++) {
    let MTOOBJ = new MTO(canvasWidth, canvasHeight, colors[i % 4])
    objts.push(MTOOBJ)
  }

  const animate = function (ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    fillBackground(ctx)
    objts.forEach((obj) => {
      obj.draw(ctx)
    })
  }

  const canvasRef = useCanvas(canvasWidth, canvasHeight, animate)
  return <canvas ref={canvasRef} />
}

export default memo(MouseTracking)
