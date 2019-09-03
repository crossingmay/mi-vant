import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble'
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss';
const path = require('path');

const ENV = process.env.NODE_ENV;
const resolveFile = function (filePath) {
  return path.join(__dirname, './', filePath)
}


export default {
  input: resolveFile('src/components/index.js'),
  output: {
    // root: 'rollupDist/',
    // file: resolveFile('rollupDist/index.js'),
    dir: 'es',
    format: 'umd',
    name: 'miVant',
    exports: 'named',
  },
  plugins: [
    resolve({ extensions: ['.js', '.vue'] }),
    postcss({
      extensions: ['.less', '.css'],
      use: [
        ['less', {
          javascriptEnabled: true
        }]
      ],
      extract: true,
      minimize: true,
    }),
    vue({
      template: {
        isProduction: true
      },
      css: false
    }),
    commonjs(),
    buble({
      objectAssign: 'Object.assign'
    }),
    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV),
    }),
    (ENV === 'production' && uglify()),
  ],
};
