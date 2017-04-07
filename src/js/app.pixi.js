// libraries
import TweenMax from 'gsap'
import * as PIXI from 'pixi.js'


// application
class App {

  constructor() {
    this.canvas = null

    this.renderer = null
    this.scene = null
    this.graphics = null

    this.sceneWidth = window.innerWidth
    this.sceneHeight = window.innerHeight

    this.init()
    this.resize()
  }

  init() {

    // canvas
    this.canvas = document.getElementById(`canvas`)

    // renderer
    this.renderer = new PIXI.WebGLRenderer(this.sceneWidth, this.sceneHeight, {
      view: this.canvas,
      antialias: true,
      resolution: window.devicePixelRatio
    })

    // scene & world
    this.scene = new PIXI.Container()
    this.createWorld()

    // render & animation ticker
    TweenMax.ticker.fps(60)
    TweenMax.ticker.addEventListener(`tick`, () => { this.tick() })

    // resize
    window.addEventListener(`resize`, () => { this.resize() }, false)
  }

  createWorld() {

    // create world here
    // example: rectangle
    this.graphics = new PIXI.Graphics()
    this.graphics.beginFill(0xFF0000)
    this.graphics.drawRect(-150, -100, 200, 200)
    this.scene.addChild(this.graphics)
  }

  tick() {
    this.update()
    this.draw()
  }

  update() {
    this.graphics.position.x = this.sceneWidth / 2
    this.graphics.position.y = this.sceneHeight / 2
    this.graphics.rotation += 0.005
  }

  draw() {
    this.renderer.render(this.scene)
  }

  resize() {

    // update vars
    this.sceneWidth = window.innerWidth
    this.sceneHeight = window.innerHeight

    // update renderer
    this.renderer.resize(this.sceneWidth, this.sceneHeight)
  }

}


// export already created instance
export const app = new App()
