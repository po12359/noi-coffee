import { defineConfig } from 'vite'

export default defineConfig({
    // 커스텀 도메인(noicoffee.com) 사용 시 루트 경로 설정
    base: '/',
    build: {
        outDir: 'dist',
    },
})
