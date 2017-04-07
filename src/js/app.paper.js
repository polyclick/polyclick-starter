// libraries
import paper from 'paper'
import TweenMax from 'gsap'


// application
class App {

  constructor() {
    this.canvas = null
    this.scope = null

    this.sceneWidth = window.innerWidth
    this.sceneHeight = window.innerHeight

    this.init()
    this.resize()
  }

  init() {

    // canvas
    this.canvas = document.getElementById(`canvas`)
    this.scope = paper.setup(canvas)

    // setup
    this.setup()

    // render & animation ticker
    TweenMax.ticker.fps(60)
    TweenMax.ticker.addEventListener(`tick`, () => { this.tick() })

    // resize
    window.addEventListener(`resize`, () => { this.resize() }, false)
  }

  setup() {
    const start = new paper.Point(100, 100)

    // draw path
		this.path = new paper.Path()
		this.path.strokeColor = `black`
		this.path.moveTo(start)
		this.path.lineTo(start.add([200, -50]))
  }

  tick() {
    this.update()
    this.draw()
  }

  update() {
    this.path.rotate(3)
  }

  draw() {
    this.scope.view.draw()
  }

  resize() {

    // update vars
    this.sceneWidth = window.innerWidth
    this.sceneHeight = window.innerHeight

    // resize
    this.scope.view.viewSize.width = this.sceneWidth
    this.scope.view.viewSize.height = this.sceneHeight
  }

}


// export already created instance
export const app = new App()
