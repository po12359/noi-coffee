import { defineConfig } from 'vite'

export default defineConfig({
    // GitHub Pages 저장소명에 맞춰 base 경로 설정
    base: '/noi-coffee/',
    build: {
        outDir: 'dist',
    },
})
