import * as THREE from 'three'

export type LessonContext = {
  wrap: HTMLElement
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  dispose: () => void
}

export function createLessonContext(
  wrapId = 'canvas-wrap',
  background = 0x0a0e14,
): LessonContext {
  const wrap = document.getElementById(wrapId)
  if (!wrap) {
    throw new Error(`#${wrapId} が見つかりません`)
  }

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(background)

  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100)
  camera.position.set(2.5, 2, 3.5)
  camera.lookAt(0, 0, 0)

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  wrap.appendChild(renderer.domElement)

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = wrap
    camera.aspect = w / Math.max(h, 1)
    camera.updateProjectionMatrix()
    renderer.setSize(w, h, false)
  }

  resize()
  window.addEventListener('resize', resize)

  return {
    wrap,
    scene,
    camera,
    renderer,
    dispose: () => {
      window.removeEventListener('resize', resize)
      renderer.dispose()
      renderer.domElement.remove()
    },
  }
}
