// libraries
import fit from 'canvas-fit'
import TweenMax from 'gsap'
import Geometry from 'gl-geometry'
import glShader from 'gl-shader'


// application
class App {

  constructor() {
    this.canvas = null
    this.gl = null

    this.sceneWidth = window.innerWidth
    this.sceneHeight = window.innerHeight

    this.init()
    this.resize()
  }

  init() {

    // canvas
    this.canvas = document.getElementById(`canvas`)

    // gl context
    this.gl = this.canvas.getContext(`webgl`)
    this.gl.clearColor(0, 0, 0, 1)

    // create world
    this.createWorld()

    // render & animation ticker
    TweenMax.ticker.fps(60)
    TweenMax.ticker.addEventListener(`tick`, () => { this.tick() })

    // resize
    window.addEventListener(`resize`, () => { this.resize() }, false)
  }

  createWorld() {
    this.quad = Geometry(this.gl)
      .attr(`aPosition`, [
        -1, -1, 0,
         1, -1, 0,
         1,  1, 0,
        -1, -1, 0,
         1,  1, 0,
        -1,  1, 0
      ])

    this.program = glShader(this.gl,
      `
      attribute vec3 position;
      varying vec2 uv;

      void main() {
        gl_Position = vec4(position, 1.0);
        uv = position.xy;
      }
      `,
      `
      precision highp float;
      uniform float t;
      varying vec2 uv;

      void main() {
        gl_FragColor = vec4(0.5*(uv+1.0), 0.5*(cos(t)+1.0), 1.0);
      }
      `)
  }

  tick() {
    this.update()
    this.draw()
  }

  update() {

  }

  draw() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT)
    this.program.bind()
    this.program.uniforms.uResolution = [512, 512]
    this.program.uniforms.uTime = performance.now() / 1000.0
    this.quad.bind(this.program)
    this.quad.draw()
  }

  resize() {

    // update vars
    this.sceneWidth = window.innerWidth
    this.sceneHeight = window.innerHeight

    // resize canvas to fit parent via util function
    fit(this.canvas)
  }
}


// export already created instance
export const app = new App()
