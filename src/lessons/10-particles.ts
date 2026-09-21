import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { createLessonContext } from '../shared/setup'

const { scene, camera, renderer } = createLessonContext()

camera.position.set(0, 1.5, 5)
camera.lookAt(0, 0, 0)

scene.add(new THREE.AmbientLight(0xffffff, 0.2))

const material = new THREE.PointsMaterial({
  color: 0x5b9dff,
  size: 0.05,
  sizeAttenuation: true,
  transparent: true,
  opacity: 0.9,
  depthWrite: false,
})

let points: THREE.Points | null = null
let positions: Float32Array | null = null
let velocities: Float32Array | null = null

function rebuild(count: number) {
  if (points) {
    scene.remove(points)
    points.geometry.dispose()
  }

  positions = new Float32Array(count * 3)
  velocities = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 6
    positions[i3 + 1] = (Math.random() - 0.5) * 4
    positions[i3 + 2] = (Math.random() - 0.5) * 6
    velocities[i3] = (Math.random() - 0.5) * 0.015
    velocities[i3 + 1] = (Math.random() - 0.5) * 0.015
    velocities[i3 + 2] = (Math.random() - 0.5) * 0.015
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  points = new THREE.Points(geometry, material)
  scene.add(points)
}

rebuild(1200)

const countInput = document.getElementById('count') as HTMLInputElement | null
const countLabel = document.getElementById('count-label')
countInput?.addEventListener('input', () => {
  const n = Number(countInput.value)
  if (countLabel) countLabel.textContent = String(n)
  rebuild(n)
})

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.autoRotate = true
controls.autoRotateSpeed = 0.4

const clock = new THREE.Clock()

function animate() {
  requestAnimationFrame(animate)
  const dt = Math.min(clock.getDelta(), 0.05)

  if (points && positions && velocities) {
    const attr = points.geometry.getAttribute('position') as THREE.BufferAttribute
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += velocities[i] * (1 + dt * 60)
      positions[i + 1] += velocities[i + 1] * (1 + dt * 60)
      positions[i + 2] += velocities[i + 2] * (1 + dt * 60)

      // 範囲を超えたら反対側へ
      for (let a = 0; a < 3; a++) {
        const limit = a === 1 ? 2 : 3
        if (positions[i + a] > limit) positions[i + a] = -limit
        if (positions[i + a] < -limit) positions[i + a] = limit
      }
    }
    attr.needsUpdate = true
  }

  controls.update()
  renderer.render(scene, camera)
}

animate()
