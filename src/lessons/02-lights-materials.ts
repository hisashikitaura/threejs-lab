import * as THREE from 'three'
import { createLessonContext } from '../shared/setup'

const { scene, camera, renderer } = createLessonContext()

const ambient = new THREE.AmbientLight(0xffffff, 0.35)
scene.add(ambient)

const directional = new THREE.DirectionalLight(0xffffff, 1.1)
directional.position.set(3, 4, 2)
scene.add(directional)

const geometry = new THREE.BoxGeometry(1.2, 1.2, 1.2)
const material = new THREE.MeshStandardMaterial({
  color: 0x5b9dff,
  metalness: 0.2,
  roughness: 0.45,
})
const mesh = new THREE.Mesh(geometry, material)
mesh.rotation.set(0.35, 0.55, 0)
scene.add(mesh)

const colorInput = document.getElementById('color') as HTMLInputElement | null
colorInput?.addEventListener('input', () => {
  material.color.set(colorInput.value)
  renderer.render(scene, camera)
})

renderer.render(scene, camera)
