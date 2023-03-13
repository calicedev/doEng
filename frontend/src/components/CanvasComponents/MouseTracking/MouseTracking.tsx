import { FC, memo } from "react"
import { useCanvas } from "../../../hooks/useCanvas"
// import { SecondWaveBackground } from "./SecondWaveBackground"

interface waveProps {
  canvasWidth: number
  canvasHeight: number
}

const MouseTracking: FC<waveProps> = function ({ canvasWidth, canvasHeight }) {
  const fillBackground = function (ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "rgba(249, 170, 70, 1)"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  }

  const animate = function (ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    fillBackground(ctx)
    // wave1.drawWaveWithNoise(ctx)
  }

  const canvasRef = useCanvas(canvasWidth, canvasHeight, animate)
  return <canvas ref={canvasRef} />
}

export default memo(MouseTracking)
