export const a: number = 1

export interface MTOInterface {
  draw: (ctx: CanvasRenderingContext2D) => void
}

let mouse = {
  x: -300,
  y: -300,
}
window.addEventListener("mousemove", function (event) {
  mouse.x = event.x
  mouse.y = event.y
})

export class MTO implements MTOInterface {
  bx: number
  by: number
  directionX: number
  directionY: number
  canvasWidth: number
  canvasHeight: number
  size: number
  color: string

  constructor(canvasWidth: number, canvasHeight: number, color: string) {
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    mouse.x = -500
    mouse.y = -500
    this.directionX = Math.random() * 0.2 - 0.1
    this.directionY = Math.random() * 0.2 - 0.1
    this.size = 0
    this.bx = Math.random() * (canvasWidth - 50 * 2 - 50 * 2) + 50 * 2
    this.by = Math.random() * (canvasHeight - 50 * 2 - 50 * 2) + 50 * 2
    this.color = color
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.moveTo(mouse.x, mouse.y)
    ctx.beginPath()
    ctx.arc(this.bx, this.by, this.size, 0, Math.PI * 2, false)
    ctx.closePath()
    ctx.fillStyle = this.color
    ctx.fill()

    if (
      this.bx + this.size * 2 > this.canvasWidth ||
      this.bx - this.size * 2 < 0
    ) {
      this.directionX = -this.directionX
    }
    if (
      this.by + this.size * 2 > this.canvasHeight ||
      this.by - this.size * 2 < 0
    ) {
      this.directionY = -this.directionY
    }

    this.bx += this.directionX
    this.by += this.directionY

    if (
      mouse.x - this.bx < 50 &&
      mouse.x - this.bx > -50 &&
      mouse.y - this.by < 50 &&
      mouse.y - this.by > -50
    ) {
      if (this.size < 50) {
        this.size += 10
        this.bx -= Math.random() * 3
        this.by += Math.random() * 3
      }
    } else if (this.size > 0) {
      this.size -= 0.2
    }
    if (this.size <= 0) {
      this.size = 0
    }
    if (this.bx > this.canvasWidth || this.bx < -10) {
      this.bx = Math.random() * (this.canvasWidth - 50 * 2 - 50 * 2) + 50 * 2
    }
    if (this.by > this.canvasHeight || this.by < -10) {
      this.by = Math.random() * (this.canvasHeight - 50 * 2 - 50 * 2) + 50 * 2
    }
  }
}
