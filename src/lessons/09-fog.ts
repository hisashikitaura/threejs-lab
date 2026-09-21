import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { createLessonContext } from '../shared/setup'

const fogColor = 0x0a0e14
const { scene, camera, renderer } = createLessonContext(undefined, fogColor)

camera.position.set(0, 3, 10)
camera.lookAt(0, 0.5, 0)
camera.far = 80
camera.updateProjectionMatrix()

scene.add(new THREE.AmbientLight(0xffffff, 0.4))
const dir = new THREE.DirectionalLight(0xffffff, 1)
dir.position.set(4, 8, 3)
scene.add(dir)

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(40, 40),
  new THREE.MeshStandardMaterial({ color: 0x1c2738, metalness: 0.05, roughness: 0.95 }),
)
ground.rotation.x = -Math.PI / 2
scene.add(ground)

const palette = [0x5b9dff, 0x3dd68c, 0xff8a5b, 0xc084fc, 0xffd166]
for (let i = 0; i < 18; i++) {
  const h = 0.8 + (i % 4) * 0.35
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, h, 0.8),
    new THREE.MeshStandardMaterial({
      color: palette[i % palette.length],
      metalness: 0.15,
      roughness: 0.5,
    }),
  )
  const angle = (i / 18) * Math.PI * 2
  const radius = 2 + (i % 5) * 1.4
  mesh.position.set(Math.cos(angle) * radius, h / 2, Math.sin(angle) * radius)
  scene.add(mesh)
}

let near = 4
let far = 18
let density = 0.06
let mode: 'Fog' | 'FogExp2' = 'Fog'

function applyFog() {
  if (mode === 'Fog') {
    scene.fog = new THREE.Fog(fogColor, near, far)
  } else {
    scene.fog = new THREE.FogExp2(fogColor, density)
  }
}

applyFog()

const typeSelect = document.getElementById('fog-type') as HTMLSelectElement | null
const nearInput = document.getElementById('near') as HTMLInputElement | null
const farInput = document.getElementById('far') as HTMLInputElement | null
const densityInput = document.getElementById('density') as HTMLInputElement | null
const nearRow = document.getElementById('near-row')
const farRow = document.getElementById('far-row')
const densityRow = document.getElementById('density-row')

function syncRows() {
  const isLinear = mode === 'Fog'
  if (nearRow) nearRow.hidden = !isLinear
  if (farRow) farRow.hidden = !isLinear
  if (densityRow) densityRow.hidden = isLinear
}

typeSelect?.addEventListener('change', () => {
  mode = typeSelect.value === 'FogExp2' ? 'FogExp2' : 'Fog'
  syncRows()
  applyFog()
})

nearInput?.addEventListener('input', () => {
  near = Number(nearInput.value)
  if (farInput && near >= Number(farInput.value)) {
    far = near + 1
    farInput.value = String(far)
  }
  applyFog()
})

farInput?.addEventListener('input', () => {
  far = Number(farInput.value)
  if (nearInput && far <= Number(nearInput.value)) {
    near = Math.max(0.5, far - 1)
    nearInput.value = String(near)
  }
  applyFog()
})

densityInput?.addEventListener('input', () => {
  density = Number(densityInput.value)
  applyFog()
})

syncRows()

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.target.set(0, 0.5, 0)
controls.maxDistance = 30

function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

animate()
