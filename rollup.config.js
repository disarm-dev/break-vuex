// rollup.config.js
import vue from 'rollup-plugin-vue'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify-es'

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/build.js',
    format: 'iife'
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production') // or 'development'
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    vue({
      css: true
    }),
    uglify()
  ],
};