import { FC, memo } from "react"
import { useCanvas } from "../../../hooks/useCanvas"
import { WaveObject } from "./WaveObj"
// import { SecondWaveBackground } from "./SecondWaveBackground"

interface waveProps {
  canvasWidth: number
  canvasHeight: number
}

const Wave: FC<waveProps> = function ({ canvasWidth, canvasHeight }) {
  const fillBackground = function (ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "rgba(31, 31, 36, 1)"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  }

  const wave1 = new WaveObject({
    canvasWidth: canvasWidth,
    canvasHeight: canvasHeight,
    color: "rgba(211, 233, 89, 0.8)",
    heightVariable: 2,
  })

  const animate = function (ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    fillBackground(ctx)
    wave1.drawWave(ctx)
  }

  const canvasRef = useCanvas(canvasWidth, canvasHeight, animate)
  return <canvas ref={canvasRef} />
}

export default memo(Wave)
