// libraries
import TweenMax from 'gsap'
import dat from 'dat-gui'

// extensions
import OrbitControls from 'three/controls/OrbitControls'



///////////////////////////////////////////////////////////////////////////////
//// APPLICATION CLASS
///////////////////////////////////////////////////////////////////////////////

class App {



  ///////////////////////////////////////////////////////////////////////////////
  //// CONSTRUCTION & DESTRUCTION
  ///////////////////////////////////////////////////////////////////////////////

  constructor() {
    this.sceneWidth = window.innerWidth
    this.sceneHeight = window.innerHeight

    this.init()
    this.handleResize()
  }



  init() {

    // gui
    this.gui = new dat.GUI()
    this.gui.closed = true

    // clock
    this.clock = new THREE.Clock()

    // renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.sceneWidth, this.sceneHeight)
    this.renderer.setClearColor(0xffffff, 1)
    document.body.appendChild(this.renderer.domElement)

    // scene
    this.createScene()

    // render & animation ticker
    TweenMax.ticker.fps(60)
    TweenMax.ticker.addEventListener(`tick`, () => { this.handleTick() })

    // resize
    window.addEventListener(`resize`, (e) => { this.handleResize(e) }, false)
  }



  createScene() {
    this.scene = new THREE.Scene()

    this.setupCameras()
    this.setupLights()
    this.setupModels()
  }



  setupCameras() {

    // default camera
    this.camera = new THREE.PerspectiveCamera(70, this.sceneWidth / this.sceneHeight, 1, 1000)
    this.camera.position.z = 400

    // default camera debug
    const camFolder = this.gui.addFolder(`Default Camera`)
    camFolder.add(this.camera, 'fov', 25, 120).onChange(() => { this.camera.updateProjectionMatrix() })
    camFolder.add(this.camera, 'zoom', 0.1, 10).onChange(() => { this.camera.updateProjectionMatrix() })
    camFolder.add(this.camera, 'near').onChange(() => { this.camera.updateProjectionMatrix() })
    camFolder.add(this.camera, 'far').onChange(() => { this.camera.updateProjectionMatrix() })
    camFolder.add(this.camera.position, 'x').name('posX').onChange(() => { this.camera.updateProjectionMatrix() })
    camFolder.add(this.camera.position, 'y').name('posY').onChange(() => { this.camera.updateProjectionMatrix() })
    camFolder.add(this.camera.position, 'z').name('posZ').onChange(() => { this.camera.updateProjectionMatrix() })
    camFolder.open()

    // controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
  }



  setupLights() {
    // add lights
  }



  setupModels() {
    // create or load models here
    // example: cube with red wireframe material
    let geometry = new THREE.BoxGeometry(200, 200, 200)
    let material = new THREE.MeshNormalMaterial()
    this.mesh = new THREE.Mesh(geometry, material)
    this.scene.add(this.mesh)


    // // example: how to load an obj file
    // //
    // // at the top, add:
    // //   - import MTLLoader from 'three/loaders/MTLLoader'
    // //   - import OBJLoader from 'three/loaders/OBJLoader'
    // const modelRoot = 'models/'

    // // load object material file first
    // const mtlLoader = new MTLLoader()
    // mtlLoader.setPath(modelRoot)
    // mtlLoader.load('object.mtl', (materials) => {

    //   // load any material texture dependencies
    //   materials.preload()

    //   // make object loader
    //   var objLoader = new OBJLoader()
    //   objLoader.setPath(modelRoot)
    //   objLoader.setMaterials(materials)

    //   // load object
    //   objLoader.load('object.obj', (object) => {
    //     object.traverse((child) => {
    //       if(child instanceof THREE.Mesh) {
    //         child.material = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true })
    //       }
    //     })

    //     this.scene.add(object)
    //   })
    // })
  }



  ///////////////////////////////////////////////////////////////////////////////
  //// UPDATE & DRAW
  ///////////////////////////////////////////////////////////////////////////////

  update() {
    const delta = this.clock.getDelta()

    if(this.controls)
      this.controls.update()

    this.mesh.rotation.x += 0.005
    this.mesh.rotation.y += 0.01
  }



  draw() {
    this.renderer.render(this.scene, this.camera)
  }



  ///////////////////////////////////////////////////////////////////////////////
  //// HANDLERS & UTILS
  ///////////////////////////////////////////////////////////////////////////////

  handleTick() {
    this.update()
    this.draw()
  }



  handleResize(e) {

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



///////////////////////////////////////////////////////////////////////////////
//// EXPORTS
///////////////////////////////////////////////////////////////////////////////

export const app = new App()
