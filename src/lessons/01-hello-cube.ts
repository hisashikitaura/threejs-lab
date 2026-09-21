import * as THREE from 'three'
import { createLessonContext } from '../shared/setup'

const { scene, camera, renderer } = createLessonContext()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x5b9dff })
const mesh = new THREE.Mesh(geometry, material)
mesh.rotation.set(0.4, 0.6, 0)
scene.add(mesh)

// Lesson 01: 一度だけ描画（ループなし）
renderer.render(scene, camera)
