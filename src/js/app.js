class Application {
  constructor() {
    this.camera = null
    this.scene = null
    this.renderer = null
    this.mesh = null

    this.init();
  }

  init() {
    // renderer
    this.renderer = new THREE.WebGLRenderer()
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
    let material = new THREE.MeshBasicMaterial({color:'#ff0000', wireframe:true})
    this.mesh = new THREE.Mesh(geometry, material)
    this.scene.add(this.mesh)

    // render & animation ticker
    TweenMax.ticker.fps(60)
    TweenMax.ticker.addEventListener('tick', this.tick.bind(this))

    // resize
    window.addEventListener('resize', this.resize.bind(this), false)
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

  resize() {

    // update camera
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()

    // update renderer
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }
}

// launch after the dom is ready
document.addEventListener('DOMContentLoaded', function(event) {
  new Application();
});
