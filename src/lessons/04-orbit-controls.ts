import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { createLessonContext } from '../shared/setup'

const { scene, camera, renderer } = createLessonContext()

scene.add(new THREE.AmbientLight(0xffffff, 0.35))
const dir = new THREE.DirectionalLight(0xffffff, 1.1)
dir.position.set(4, 5, 2)
scene.add(dir)

const mesh = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.6, 0.22, 128, 16),
  new THREE.MeshStandardMaterial({ color: 0xff8a5b, metalness: 0.35, roughness: 0.35 }),
)
scene.add(mesh)

const grid = new THREE.GridHelper(6, 12, 0x3a4a66, 0x243044)
grid.position.y = -1.2
scene.add(grid)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.target.set(0, 0, 0)

const clock = new THREE.Clock()

function animate() {
  requestAnimationFrame(animate)
  const t = clock.getElapsedTime()
  mesh.rotation.y = t * 0.35
  controls.update()
  renderer.render(scene, camera)
}

animate()

