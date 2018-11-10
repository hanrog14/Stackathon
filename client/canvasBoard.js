import {EventEmitter} from 'events'

const canvasBoard = new EventEmitter()

export default canvasBoard

// Canvas setup
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

export function draw (start, end, shouldBroadcast = true) {
  ctx.beginPath()
  ctx.strokeStyle = 'black'
  ctx.moveTo(...start)
  ctx.lineTo(...end)
  ctx.closePath()
  ctx.stroke()

  shouldBroadcast &&
    canvasBoard.emit('draw', start, end)
}

let currentMousePosition = {
  x: 0,
  y: 0
}

let lastMousePosition = {
  x: 0,
  y: 0
}

function setup () {
  document.body.appendChild(canvas)

  setupCanvas()
}

function resize () {
  // Unscale the canvas (if it was previously scaled)
  ctx.setTransform(1, 0, 0, 1, 0, 0)

  // The device pixel ratio is the multiplier between CSS pixels
  // and device pixels
  const pixelRatio = window.devicePixelRatio || 1

  // Allocate backing store large enough to give us a 1:1 device pixel
  // to canvas pixel ratio.
  const w = canvas.clientWidth * pixelRatio * 2
  const h = canvas.clientHeight * pixelRatio * 2
  if (w !== canvas.width || h !== canvas.height) {
    // Resizing the canvas destroys the current content.
    // So, save it...
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)

    canvas.width = w; canvas.height = h

    // ...then restore it.
    ctx.putImageData(imgData, 0, 0)
  }

  // Scale the canvas' internal coordinate system by the device pixel
  // ratio to ensure that 1 canvas unit = 1 css pixel, even though our
  // backing store is larger.
  ctx.scale(pixelRatio, pixelRatio)

  ctx.lineWidth = 5
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
}

function setupCanvas () {
  // Set the size of the canvas and attach a listener
  // to handle resizing.
  resize()
  window.addEventListener('resize', resize)

  window.addEventListener('mousedown', (e) => {
    currentMousePosition = pos(e)
  })

  window.addEventListener('mousemove', (e) => {
    if (!e.buttons) return
    lastMousePosition = currentMousePosition
    currentMousePosition = pos(e)
    lastMousePosition && currentMousePosition &&
            draw(lastMousePosition, currentMousePosition, true)
  })
}

function pos (e) {
  return [
    e.pageX*2 - canvas.offsetLeft,
    e.pageY*2 - canvas.offsetTop
  ]
}

document.addEventListener('DOMContentLoaded', setup)
