import $ from 'jquery'
// import _ from 'lodash'
import TweenMax from 'gsap'

// import three and make it global
// so plugins can hook onto the namespace THREE
import THREE from 'three'
window.THREE = THREE

// application
class App {
  constructor() {
    this.$canvas = null

    this.renderer = null
    this.camera = null
    this.scene = null
    this.mesh = null

    this.sceneWidth = window.innerWidth
    this.sceneHeight = window.innerHeight

    $(document).ready(() => {
      this.init()
      this.resize()
    })
  }

  init() {

    // canvas
    this.$canvas = $('#canvas')

    // renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: this.$canvas[0], antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.sceneWidth, this.sceneHeight)

    // camera
    this.camera = new THREE.PerspectiveCamera(70, this.sceneWidth / this.sceneHeight, 1, 1000)
    this.camera.position.z = 400

    // scene & world
    this.scene = new THREE.Scene()
    this.createWorld()

    // render & animation ticker
    TweenMax.ticker.fps(60)
    TweenMax.ticker.addEventListener('tick', () => { this.tick() })

    // resize handler, resize once
    $(window).resize(() => { this.resize() })
  }

  createWorld() {

    // create world here
    // example: cube with red wireframe material
    let geometry = new THREE.BoxGeometry(200, 200, 200)
    let material = new THREE.MeshBasicMaterial({ color: '#ff0000', wireframe: true })
    this.mesh = new THREE.Mesh(geometry, material)
    this.scene.add(this.mesh)


    // example: how to load an obj file
    //
    // at the top, add: import 'three/loaders/OBJLoader'
    //
    // let loader = new THREE.OBJLoader()
    // loader.load('models/model/model.obj', (object) => {
    //   object.traverse((child) => {
    //     if (child instanceof THREE.Mesh) {
    //       child.material = new THREE.MeshBasicMaterial({ color: '#ff0000', wireframe: true })
    //     }
    //   })
    //   this.scene.add(object)
    // })
  }

  tick() {
    this.update()
    this.draw()
  }

  update() {
    this.mesh.rotation.x += 0.005
    this.mesh.rotation.y += 0.01
  }

  draw() {
    this.renderer.render(this.scene, this.camera)
  }

  resize() {

    // update vars
    this.sceneWidth = window.innerWidth
    this.sceneHeight = window.innerHeight

    // update camera
    this.camera.aspect = this.sceneWidth / this.sceneHeight
    this.camera.updateProjectionMatrix()

    // update renderer
    this.renderer.setSize(this.sceneWidth, this.sceneHeight)
  }
}

// export already created instance
export let app = new App()
