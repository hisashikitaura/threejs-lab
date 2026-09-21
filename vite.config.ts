import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        lesson01: resolve(root, 'lessons/01-hello-cube/index.html'),
        lesson02: resolve(root, 'lessons/02-lights-materials/index.html'),
        lesson03: resolve(root, 'lessons/03-animation/index.html'),
        lesson04: resolve(root, 'lessons/04-orbit-controls/index.html'),
        lesson05: resolve(root, 'lessons/05-multiple-objects/index.html'),
        lesson06: resolve(root, 'lessons/06-textures/index.html'),
      },
    },
  },
})
