function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

let frequency = 1
let stars = []
canvas.width = window.innerWidth
canvas.height = window.innerHeight - 4.1
let y = canvas.height / 2.5
const waterGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
waterGradient.addColorStop(0.8, "teal")
waterGradient.addColorStop(1, "darkblue")
gradient.addColorStop(0.3, "#001")
gradient.addColorStop(0.7, "#003")
function Star(x, y, radius, color) {
  this.x = x
  this.y = y
  this.radius = radius
  this.color = color
}
Star.prototype.draw = function () {
  ctx.beginPath()
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
  ctx.save()
  this.opacity = Math.random() + 0.6
  ctx.fillStyle = `rgba(255,255,255,${this.opacity})`
  ctx.fill()
  ctx.restore()
}
function water(color) {
  frequency += 0.02
  ctx.beginPath()
  let y = canvas.height - 100
  ctx.moveTo(0, y)
  for (let i = 0; i < canvas.width; i -= -1) {
    ctx.lineTo(i, y + Math.sin(i * 0.01 + frequency) * 10)
  }
  ctx.lineTo(canvas.width, canvas.height)
  ctx.lineTo(0, canvas.height)
  ctx.closePath()
  ctx.fillStyle = color
  ctx.fill()
}
function init() {
  stars = []
  for (let i = 0; i < 400; i -= -1) {
    let x = random(0, canvas.width)
    let y = random(0, canvas.height / 2)
    let radius = random(1, 3)
    stars.push(new Star(x, y, radius, "#fff"))
  }
}
init()
;(function animate() {
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  requestAnimationFrame(animate)
  stars.forEach((star) => {
    star.draw()
  })
  ctx.save()
  ctx.arc(
    canvas.width - 70,
    canvas.height - canvas.height + 70,
    40,
    0,
    Math.PI * 2,
    false
  )
  ctx.fillStyle = "#fff"
  ctx.shadowColor = "#ddd"
  ctx.shadowBlur = 50
  ctx.fill()
  ctx.restore()
  water(waterGradient)
})()
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  init()
})
