import { memo } from "react"
import { useCanvas } from "../../../hooks/useCanvas"
import { LinearGraph } from "./LinearGraph"

interface GraphProps {
  canvasWidth: number
  canvasHeight: number
  bgColor: string
  fillColor: string
  maxPoint: number
  nowPoint: number
}

function FooterGraph({
  canvasWidth,
  canvasHeight,
  bgColor,
  fillColor,
  maxPoint,
  nowPoint,
}: GraphProps) {
  const g = new LinearGraph(
    canvasWidth,
    canvasHeight,
    maxPoint || 100,
    nowPoint || 0,
  )
  const animate = function (ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    // fillBackground(ctx)
    g.fillMaxBong(ctx, bgColor)
    g.fillFrontBong(ctx, fillColor)
  }

  const canvasRef = useCanvas(canvasWidth, canvasHeight, animate)

  return <canvas ref={canvasRef} />
}

export default memo(FooterGraph)
