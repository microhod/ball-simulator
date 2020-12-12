const defaultProps = {
  style: "red",
  radius: 20,
  x: 0,
  y: 0
}

function rand(min, max) {
  return min + (Math.random() * (max - min))
}

export default class Ball {
  constructor (props) {

    props = {
      ...defaultProps,
      velX: rand(1, 5),
      velY: rand(1, 5),
      ...props,
    }

    this.style = props.style
    this.radius = props.radius

    this.x = props.x
    this.y = props.y

    this.velX = props.velX
    this.velY = props.velY
  }

  draw (ctx) {
    ctx.beginPath()
    ctx.fillStyle = this.style
    ctx.arc(
      this.x, this.y,
      this.radius,
      0, Math.PI * 2
    )
    ctx.fill()
  }

  update (canvas, gravity, friction, bounce) {
    
    var left = this.x - this.radius
    var right = this.x + this.radius
    var top = this.y - this.radius
    var bottom = this.y + this.radius
    
    if (left <= 0) {
      this.x = this.radius
      this.velX *= -bounce
      this.velY *= friction
    }
    if (right >= canvas.width) {
      this.x = canvas.width - this.radius
      this.velX *= -bounce
      this.velY *= friction
    }
    if (top <= 0) {
      this.y = this.radius
      this.velY *= -bounce
      this.velX *= friction
    }
    if (bottom >= canvas.height) {
      this.y = canvas.height - this.radius
      this.velY *= -bounce
      this.velX *= friction
    }

    // reset insignificant amounts to 0
    if (Math.abs(this.velX) < 0.01) {
      this.velX = 0
    }
    if (Math.abs(this.velY) < 0.01) {
      this.velY = 0
    }
  
    // gravity
    this.velY += gravity
    
    // update ball position
    this.x += this.velX
    this.y += this.velY
  }
}