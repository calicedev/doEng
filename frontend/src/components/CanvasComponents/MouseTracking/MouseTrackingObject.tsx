export const a: number = 1

interface MTOInterface {
  setting: () => void
  draw: (ctx: CanvasRenderingContext2D, color: string) => void
}

class MTO implements MTOInterface {
  mx: number
  my: number
  bx: number
  by: number
  directionX: number
  directionY: number
  canvasWidth: number
  canvasHeight: number
  size: number

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.mx = 0
    this.my = 0
    this.directionX = 0
    this.directionY = 0
    this.size = 0
    this.bx = 0
    this.by = 0
  }

  setting() {
    window.addEventListener("mousemove", (event) => {
      this.mx = event.x
      this.my = event.y
    })
  }

  draw(ctx: CanvasRenderingContext2D, color: string) {
    ctx.beginPath()
    ctx.arc(this.bx, this.by, this.size, 0, Math.PI * 2, false)
    ctx.fillStyle = color
    ctx.fill()
  }

  update(ctx: CanvasRenderingContext2D, color: string) {
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
    let mouseRadius: number = 50
    if (
      this.mx - this.bx < mouseRadius &&
      this.mx - this.bx > -mouseRadius &&
      this.my - this.by < mouseRadius &&
      this.my - this.by > -mouseRadius
    ) {
      if (this.size < maxSize) {
        this.size += 3
        this.mx -= 1.5
      }
    } else if (this.size > minSize) {
      this.size -= 0.1
    }
    if (this.size < 0) {
      this.size = 0
    }
    this.draw(ctx, color)
  }

  init() {
    let MTOArr: MTO[] = []
    let size: number = 0
    let x: number =
      Math.random() * (innerWidth - size * 2 - size * 2) + size * 2
    let y: number =
      Math.random() * (innerHeight - size * 2 - size * 2) + size * 2
    let directionX: number = Math.random() * 0.2 - 0.1
    let directionY: number = Math.random() * 0.2 - 0.1
  }
}
