import Scene from './scene.js'

var scene

var gravity = document.getElementById("gravity")
var friction = document.getElementById("friction")
var bounce = document.getElementById("bounce")
var numBalls = document.getElementById("balls")

var getGravity = () => {
  return gravity.value / 50
}
var getFriction = () => {
  return 1 - (friction.value / 100)
}
var getBounce = () => {
  return bounce.value / 100
}

var newCanvas = document.getElementById("new")

scene = new Scene({
  canvasId: "canvas",
  width: 600,
  height: 600,
  
  numBalls: numBalls.value,

  gravity: getGravity(),
  friction: getFriction(),
  bounce: getBounce()
})

var updateScene = () => {
  scene.gravity = getGravity(),
  scene.friction = getFriction(),
  scene.bounce = getBounce()
}

// reload when sliders have loaded
window.addEventListener('load', updateScene)

// update on slider changes
gravity.addEventListener("change", updateScene)
friction.addEventListener("change", updateScene)
bounce.addEventListener("change", updateScene)

// reset balls on 'new' click
newCanvas.addEventListener("click", () => {
  scene.generateBalls(numBalls.value)
  updateScene()
})
