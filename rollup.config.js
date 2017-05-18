import cssnano from 'cssnano';
import alias from 'rollup-plugin-alias';
import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import uglify from 'rollup-plugin-uglify';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';

const plugins = [
    vue({
        css: 'src/assets/flexui/style.css',
    }),
    postcss({
        plugins: [
        cssnano()
      ],
        sourceMap: true,
        extract: true,
        extensions: ['.css', '.sass']
    }),
    alias({   
        vue: 'src/assets/vuejs/vue.esm.js'  
    }),
    buble({
        exclude: 'node_modules/**'
    }),
    resolve({
        browser: true,
        jsnext: true,
        main: true
    }),
    globals(),
    builtins(),
    commonjs()
]

if (process.env.NODE_ENV === 'production') {
    plugins.push(uglify())
}

if (process.env.NODE_ENV === 'development') {
    plugins.push(livereload())
    plugins.push(serve({
        open: true,
        contentBase: ['build'],
        host: 'localhost',
        port: 1010
    }))
}

export default {
    entry: 'src/app.js',
    dest: 'build/app.bundle.js',
    format: 'iife',
    sourceMap: true,
    plugins
}
