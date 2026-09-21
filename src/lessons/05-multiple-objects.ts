import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { createLessonContext } from '../shared/setup'

const { scene, camera, renderer } = createLessonContext()

scene.add(new THREE.AmbientLight(0xffffff, 0.4))
const dir = new THREE.DirectionalLight(0xffffff, 1)
dir.position.set(3, 5, 2)
scene.add(dir)

const group = new THREE.Group()
scene.add(group)

const colors = [0x5b9dff, 0x3dd68c, 0xff8a5b, 0xc084fc]
const geometries: THREE.BufferGeometry[] = [
  new THREE.BoxGeometry(0.7, 0.7, 0.7),
  new THREE.SphereGeometry(0.4, 32, 32),
  new THREE.ConeGeometry(0.4, 0.8, 24),
  new THREE.TorusGeometry(0.35, 0.14, 16, 48),
]

const positions: [number, number, number][] = [
  [-1.1, 0.3, 0],
  [1.1, 0.3, 0],
  [0, 0.35, -1.1],
  [0, 0.2, 1.1],
]

geometries.forEach((geo, i) => {
  const mat = new THREE.MeshStandardMaterial({
    color: colors[i],
    metalness: 0.2,
    roughness: 0.45,
  })
  const mesh = new THREE.Mesh(geo, mat)
  mesh.position.set(...positions[i])
  group.add(mesh)
})

const floor = new THREE.Mesh(
  new THREE.CircleGeometry(2.4, 48),
  new THREE.MeshStandardMaterial({ color: 0x1c2738, metalness: 0.1, roughness: 0.9 }),
)
floor.rotation.x = -Math.PI / 2
floor.position.y = -0.55
scene.add(floor)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const clock = new THREE.Clock()
let spin = 0.6

const spinInput = document.getElementById('spin') as HTMLInputElement | null
spinInput?.addEventListener('input', () => {
  spin = Number(spinInput.value)
})

function animate() {
  requestAnimationFrame(animate)
  const dt = clock.getDelta()
  group.rotation.y += dt * spin
  group.children.forEach((child, i) => {
    child.rotation.x += dt * (0.4 + i * 0.15)
  })
  controls.update()
  renderer.render(scene, camera)
}

animate()
