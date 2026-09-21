import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { createLessonContext } from '../shared/setup'

const { scene, camera, renderer } = createLessonContext()

camera.position.set(4, 4, 5)
camera.lookAt(0, 0.5, 0)

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

scene.add(new THREE.AmbientLight(0xffffff, 0.35))

const dir = new THREE.DirectionalLight(0xffffff, 1.2)
dir.position.set(4, 8, 3)
dir.castShadow = true
dir.shadow.mapSize.set(1024, 1024)
dir.shadow.camera.near = 0.5
dir.shadow.camera.far = 25
dir.shadow.camera.left = -6
dir.shadow.camera.right = 6
dir.shadow.camera.top = 6
dir.shadow.camera.bottom = -6
scene.add(dir)

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(14, 14),
  new THREE.MeshStandardMaterial({ color: 0x1c2738, metalness: 0.05, roughness: 0.95 }),
)
ground.rotation.x = -Math.PI / 2
ground.receiveShadow = true
scene.add(ground)

const box = new THREE.Mesh(
  new THREE.BoxGeometry(1.2, 1.2, 1.2),
  new THREE.MeshStandardMaterial({ color: 0x5b9dff, metalness: 0.2, roughness: 0.45 }),
)
box.position.set(-1.2, 0.6, 0)
box.castShadow = true
box.receiveShadow = true
scene.add(box)

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.55, 32, 32),
  new THREE.MeshStandardMaterial({ color: 0xff8a5b, metalness: 0.15, roughness: 0.4 }),
)
sphere.position.set(1.3, 0.55, 0.4)
sphere.castShadow = true
sphere.receiveShadow = true
scene.add(sphere)

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.45, 0.16, 16, 48),
  new THREE.MeshStandardMaterial({ color: 0x3dd68c, metalness: 0.25, roughness: 0.4 }),
)
torus.position.set(0.1, 0.7, -1.2)
torus.rotation.x = Math.PI / 3
torus.castShadow = true
torus.receiveShadow = true
scene.add(torus)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.target.set(0, 0.5, 0)

const shadowsInput = document.getElementById('shadows') as HTMLInputElement | null
shadowsInput?.addEventListener('change', () => {
  const on = shadowsInput.checked
  renderer.shadowMap.enabled = on
  dir.castShadow = on
  // material 側のフラグを再適用してシャドウマップを更新
  renderer.shadowMap.needsUpdate = true
})

const clock = new THREE.Clock()

function animate() {
  requestAnimationFrame(animate)
  const t = clock.getElapsedTime()
  box.rotation.y = t * 0.5
  torus.rotation.z = t * 0.7
  sphere.position.y = 0.55 + Math.sin(t * 1.4) * 0.25
  controls.update()
  renderer.render(scene, camera)
}

animate()
