import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { createLessonContext } from '../shared/setup'

const { scene, camera, renderer } = createLessonContext()

scene.add(new THREE.AmbientLight(0xffffff, 0.5))
const dir = new THREE.DirectionalLight(0xffffff, 1)
dir.position.set(3, 4, 2)
scene.add(dir)

/** 外部 CDN 不要: キャンバスでチェッカー模様を生成してテクスチャ化 */
function createCheckerTexture(size = 256): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('2D canvas context を取得できません')
  }

  const cell = size / 8
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      ctx.fillStyle = (x + y) % 2 === 0 ? '#5b9dff' : '#1a2332'
      ctx.fillRect(x * cell, y * cell, cell, cell)
    }
  }
  ctx.fillStyle = '#e7ecf3'
  ctx.font = 'bold 28px sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('Three.js', size / 2, size / 2)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4
  return texture
}

const texture = createCheckerTexture()
const material = new THREE.MeshStandardMaterial({
  map: texture,
  color: 0xffffff,
  metalness: 0.1,
  roughness: 0.55,
})

const mesh = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.4, 1.4), material)
scene.add(mesh)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const tintInput = document.getElementById('tint') as HTMLInputElement | null
tintInput?.addEventListener('input', () => {
  material.color.set(tintInput.value)
})

const clock = new THREE.Clock()

function animate() {
  requestAnimationFrame(animate)
  const t = clock.getElapsedTime()
  mesh.rotation.y = t * 0.4
  mesh.rotation.x = Math.sin(t * 0.5) * 0.2
  controls.update()
  renderer.render(scene, camera)
}

animate()
