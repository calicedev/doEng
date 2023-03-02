export interface WaveObjInterface {
  drawWave: (ctx: CanvasRenderingContext2D) => void
}

export interface WaveObjArg {
  canvasWidth: number
  canvasHeight: number
  heightVariable: number
  color: string
}

export class WaveObject implements WaveObjInterface {
  waveHeight: number
  canvasHeight: number
  canvasWidth: number
  color: string
  x: number = 0
  y: number = 0
  speed: number = 0.2
  startHeight: number

  constructor({
    canvasWidth,
    canvasHeight,
    color,
    heightVariable,
  }: WaveObjArg) {
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.color = color
    this.waveHeight = canvasHeight / heightVariable
    this.startHeight = this.waveHeight
  }

  drawWave(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.moveTo(0, this.startHeight)
    for (let i = 0; i < this.canvasWidth; i += 1) {
      ctx.lineTo(i, this.startHeight + Math.sin(i * 0.01) * 100)
    }
    ctx.lineTo(this.canvasWidth, this.canvasHeight)
    ctx.lineTo(0, this.canvasHeight)
    ctx.closePath()
    ctx.fillStyle = this.color
    ctx.fill()
    if (
      this.startHeight >=
      this.waveHeight + Math.sin(this.canvasWidth * 0.03) * 160
    ) {
      this.speed = -this.speed
    } else if (
      this.startHeight <=
      this.waveHeight - Math.sin(this.canvasWidth * 0.03) * 160
    ) {
      this.speed = -this.speed
    }
    this.startHeight += this.speed
  }
}
