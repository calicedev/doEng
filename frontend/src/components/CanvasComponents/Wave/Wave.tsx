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
    ctx.fillStyle = "rgba(249, 170, 70, 1)"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  }

  const wave1 = new WaveObject({
    canvasWidth: canvasWidth,
    canvasHeight: canvasHeight,
    color: "rgba(248, 145, 64, 1)",
    heightVariable: 2.3,
    plce: 1.4,
  })
  const wave2 = new WaveObject({
    canvasWidth: canvasWidth,
    canvasHeight: canvasHeight,
    color: "rgba(247, 118, 58, 1)",
    heightVariable: 1.48,
    plce: 1.8,
  })
  const wave3 = new WaveObject({
    canvasWidth: canvasWidth,
    canvasHeight: canvasHeight,
    color: "rgba(246, 99, 55, 1)",
    heightVariable: 1.18,
    plce: 1.8,
  })

  const animate = function (ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    fillBackground(ctx)
    // wave1.drawWaveWithNoise(ctx)
    wave1.drawWave(ctx)
    wave2.drawWave(ctx)
    wave3.drawWave(ctx)
  }

  const canvasRef = useCanvas(canvasWidth, canvasHeight, animate)
  return <canvas ref={canvasRef} />
}

export default memo(Wave)
