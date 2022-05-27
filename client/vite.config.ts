import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	test: {
		globals: true,
		coverage: {
			all: true,
			include: ["src/**/*"],
		}
	},
	plugins: [vue()]
});
