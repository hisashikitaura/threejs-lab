import * as THREE from 'three'
import { createLessonContext } from '../shared/setup'

const { scene, camera, renderer } = createLessonContext()

scene.add(new THREE.AmbientLight(0xffffff, 0.3))
const dir = new THREE.DirectionalLight(0xffffff, 1)
dir.position.set(3, 4, 2)
scene.add(dir)

const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1.1, 1.1, 1.1),
  new THREE.MeshStandardMaterial({ color: 0x3dd68c, metalness: 0.15, roughness: 0.4 }),
)
scene.add(mesh)

const clock = new THREE.Clock()
let speed = 1

const speedInput = document.getElementById('speed') as HTMLInputElement | null
speedInput?.addEventListener('input', () => {
  speed = Number(speedInput.value)
})

function animate() {
  requestAnimationFrame(animate)
  const dt = clock.getDelta()
  mesh.rotation.x += dt * speed
  mesh.rotation.y += dt * speed * 1.3
  renderer.render(scene, camera)
}

animate()
