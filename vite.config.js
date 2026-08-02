import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     babel({ presets: [reactCompilerPreset()] }),
//     tailwindcss()
//   ],
//    base: mode === 'production' ? '/CV_Laith_Dawara/' : '/',
//   build: {
//     outDir: 'dist'   
//   }
// })
// إذا كنت تستخدم React:

export default defineConfig(({ command, mode }) => { // هنا يتم تعريف 'mode'
  return {
    // هنا يأتي الجزء الذي أضفته
    base: mode === 'production' ? '/CV_Laith_Dawara/' : '/',

    build: {
      outDir: 'dist' // مجلد الناتج الافتراضي
    },

     plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss()
  ]
    // هنا يمكنك إضافة Plugins الخاصة بك، مثلاً:
    // plugins: [react()], // لـ React
    // plugins: [vue()],   // لـ Vue
  };
});
