export interface WaveObjInterface {
  drawWaveWithNoise: (ctx: CanvasRenderingContext2D) => void
  drawWave: (ctx: CanvasRenderingContext2D) => void
}

export interface WaveObjArg {
  canvasWidth: number
  canvasHeight: number
  heightVariable: number
  color: string
  plce: number
}

// 360도는 6.2831853071640001 라디안.

export class WaveObject implements WaveObjInterface {
  K: number
  F: number
  SPEED: number
  NOISE: number
  PHASE: number
  MAX: number
  width: number
  height: number
  canvasWidth: number
  canvasHeight: number
  color: string
  att: number
  plce: number
  atrbt: number

  constructor({
    canvasWidth,
    canvasHeight,
    color,
    heightVariable,
    plce,
  }: WaveObjArg) {
    this.K = 0.5
    this.F = 15
    this.SPEED = 0.02
    this.NOISE = 30
    this.PHASE = 0
    this.MAX = canvasHeight / 2 - 4
    this.width = window.devicePixelRatio * (canvasWidth || 320)
    this.height = window.devicePixelRatio * (canvasHeight || 100)
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.color = color
    this.att = heightVariable
    this.plce = plce
    this.atrbt = Math.random() * 2
  }

  drawWaveWithNoise(ctx: CanvasRenderingContext2D) {
    this.PHASE = (this.PHASE + this.SPEED) % (Math.PI * 64)
    ctx.moveTo(0, 0)
    ctx.beginPath()
    ctx.strokeStyle = this.color
    ctx.lineWidth = 1
    let x, y
    for (let i = -this.K; i <= this.K; i += 0.01) {
      i = parseFloat(i.toFixed(2))
      x = this.width * ((i + this.K) / (this.K * 2))
      y =
        this.height / this.plce +
        this.NOISE *
          Math.pow(Math.sin(i * 10 * this.att), 1) *
          Math.sin(this.F * i - this.PHASE)
      ctx.lineTo(x, y)
    }
    ctx.lineTo(this.canvasWidth, this.canvasHeight)
    ctx.lineTo(0, this.canvasHeight)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }

  drawWave(ctx: CanvasRenderingContext2D) {
    ctx.moveTo(0, 0)
    ctx.beginPath()
    ctx.strokeStyle = this.color
    ctx.lineWidth = 1
    let x: number, y: number
    for (let i = 0; i < this.canvasWidth; i++) {
      x = i
      y =
        this.canvasHeight / this.att +
        Math.sin(i * 0.008 + this.atrbt) * this.canvasHeight * 0.099
      ctx.lineTo(x, y)
    }
    ctx.lineTo(this.canvasWidth, this.canvasHeight)
    ctx.lineTo(0, this.canvasHeight)
    ctx.closePath()
    ctx.fillStyle = this.color
    ctx.fill()
    this.atrbt += 0.0018
    // if (this.atrbt >= 1) {
    //   this.atrbt = 0
    // }
    if (this.atrbt >= 6.2831853071640001) {
      this.atrbt = 0
    }
  }
}
