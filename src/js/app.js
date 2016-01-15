'use strict'

import $ from 'jquery'
import TweenMax from 'gsap'

// import three and make it global
// so plugins can hook onto the namespace THREE
import THREE from 'three'
window.THREE = THREE

import 'three/loaders/OBJLoader'

class App {
  constructor() {
    this.camera = null
    this.scene = null
    this.renderer = null
    this.mesh = null

    $(document).ready(() => { this.init() })
  }

  init() {
    // renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)

    // camera
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000)
    this.camera.position.z = 400

    // scene
    this.scene = new THREE.Scene()

    // geomertry, material & mesh
    let geometry = new THREE.BoxGeometry(200, 200, 200)
    let material = new THREE.MeshBasicMaterial({ color: '#ff0000', wireframe: true })
    this.mesh = new THREE.Mesh(geometry, material)
    this.scene.add(this.mesh)

    // example how to load an obj file
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

    // render & animation ticker
    TweenMax.ticker.fps(60)
    TweenMax.ticker.addEventListener('tick', () => { this.tick() })

    // resize handler
    $(window).resize(() => { this.resizeHandler() })
  }

  tick() {
    this.animate()
    this.render()
  }

  animate() {
    this.mesh.rotation.x += 0.005
    this.mesh.rotation.y += 0.01
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  resizeHandler() {
    // update camera
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()

    // update renderer
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }
}

// export already created instance
export let app = new App()
