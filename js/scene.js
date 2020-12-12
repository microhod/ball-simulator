import Ball from "./ball.js"

function randInt(min, max) {
  return min + Math.floor(Math.random() * (max - min))
}

function randomBall() {
  const colours = ["purple", "red", "blue", "green", "orange"]
  const r = randInt(10, 30)
  return new Ball({
    style: colours[randInt(0, colours.length) % colours.length],
    radius: r,
    // start at a random point
    x: randInt(r, canvas.width - r),
    y: randInt(r, canvas.height - r),
    // random velocity
    velX: randInt(1, 10),
    velY: randInt(1, 10),
  })
}

const defaultProps = {
  canvasId: "canvas",
  width: 600,
  height: 600,
  gravity: 0,
  friction: 1,
  numBalls: 10,
  bounce: 1
}

export default class Scene {

  constructor(props) {

    props = {
      ...defaultProps,
      ...props
    }

    this.canvas = document.getElementById(props.canvasId)
    this.ctx = canvas.getContext('2d')

    // set the canvas size
    canvas.width = props.width
    canvas.height = props.height

    // world/scene settings
    this.gravity = props.gravity
    this.friction = props.friction
    this.bounce = props.bounce

    this.generateBalls(props.numBalls)

    // begin update loop
    document.addEventListener('DOMContentLoaded', () => this.update())
  }

  generateBalls(numBalls) {
    this.balls = []
    for (let i = 0; i < numBalls; i++) {
      this.balls.push(randomBall())
      
    }
  }

  update() {
    const { ctx, canvas, balls, gravity, friction, bounce } = this

    // queue the next update
    window.requestAnimationFrame(() => this.update())

    balls.forEach(b => b.update(canvas, gravity, friction, bounce))

    // clear the canvas and redraw everything
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    balls.forEach(b => b.draw(ctx))
  }
}