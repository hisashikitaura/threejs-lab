import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { createLessonContext } from '../shared/setup'

const { wrap, scene, camera, renderer } = createLessonContext()

scene.add(new THREE.AmbientLight(0xffffff, 0.45))
const dir = new THREE.DirectionalLight(0xffffff, 1)
dir.position.set(3, 5, 2)
scene.add(dir)

const floor = new THREE.Mesh(
  new THREE.CircleGeometry(2.6, 48),
  new THREE.MeshStandardMaterial({ color: 0x1c2738, metalness: 0.1, roughness: 0.9 }),
)
floor.rotation.x = -Math.PI / 2
floor.position.y = -0.55
scene.add(floor)

type Selectable = {
  mesh: THREE.Mesh
  name: string
  baseColor: number
}

const selectables: Selectable[] = []
const colors = [0x5b9dff, 0x3dd68c, 0xff8a5b, 0xc084fc]
const names = ['立方体', '球', '円錐', 'トーラス']
const geometries: THREE.BufferGeometry[] = [
  new THREE.BoxGeometry(0.75, 0.75, 0.75),
  new THREE.SphereGeometry(0.42, 32, 32),
  new THREE.ConeGeometry(0.42, 0.85, 24),
  new THREE.TorusGeometry(0.36, 0.14, 16, 48),
]
const positions: [number, number, number][] = [
  [-1.1, 0.2, 0],
  [1.1, 0.2, 0],
  [0, 0.25, -1.1],
  [0, 0.1, 1.1],
]

geometries.forEach((geo, i) => {
  const mat = new THREE.MeshStandardMaterial({
    color: colors[i],
    metalness: 0.2,
    roughness: 0.45,
    emissive: 0x000000,
  })
  const mesh = new THREE.Mesh(geo, mat)
  mesh.position.set(...positions[i])
  mesh.userData.name = names[i]
  scene.add(mesh)
  selectables.push({ mesh, name: names[i], baseColor: colors[i] })
})

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()
const label = document.getElementById('selected-label')

function clearHighlight() {
  for (const item of selectables) {
    const mat = item.mesh.material as THREE.MeshStandardMaterial
    mat.emissive.setHex(0x000000)
    mat.emissiveIntensity = 0
  }
  if (label) label.textContent = 'なし'
}

function highlight(mesh: THREE.Mesh) {
  clearHighlight()
  const mat = mesh.material as THREE.MeshStandardMaterial
  mat.emissive.setHex(0xffd166)
  mat.emissiveIntensity = 0.55
  if (label) label.textContent = String(mesh.userData.name ?? '選択中')
}

/** キャンバス上のポインタを NDC（-1〜1）へ変換してレイを飛ばす */
function pick(clientX: number, clientY: number) {
  const rect = renderer.domElement.getBoundingClientRect()
  pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1
  pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1
  raycaster.setFromCamera(pointer, camera)
  const hits = raycaster.intersectObjects(
    selectables.map((s) => s.mesh),
    false,
  )
  if (hits.length > 0) {
    highlight(hits[0].object as THREE.Mesh)
  } else {
    clearHighlight()
  }
}

// ドラッグとクリックを区別する
let downX = 0
let downY = 0
wrap.addEventListener('pointerdown', (e) => {
  downX = e.clientX
  downY = e.clientY
})
wrap.addEventListener('pointerup', (e) => {
  const dx = e.clientX - downX
  const dy = e.clientY - downY
  if (dx * dx + dy * dy < 25) {
    pick(e.clientX, e.clientY)
  }
})

const clock = new THREE.Clock()

function animate() {
  requestAnimationFrame(animate)
  const t = clock.getElapsedTime()
  selectables.forEach((item, i) => {
    item.mesh.rotation.y = t * (0.3 + i * 0.1)
  })
  controls.update()
  renderer.render(scene, camera)
}

animate()
