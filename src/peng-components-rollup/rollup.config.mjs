import postcss from 'rollup-plugin-postcss';
import typescript from '@rollup/plugin-typescript';

// node-resolve 插件是解析 node_modules 下的包的
import resolve from '@rollup/plugin-node-resolve';
// commonjs 插件是转换 commonjs 到 es module 的（因为 rollup 只支持 es module 模块）
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';


/** @type {import("rollup").RollupOptions} */
export default {
    // input 指定入口模块
    input: 'src/index.ts',

    // external 是指定不打包到产物里的 npm 包
    external: ['react', 'react-dom'],

    // output 指定产物的格式，分别打包 esm、cjs、umd 模块规范的产物
    output: [
        {
            file: 'dist/esm.js',
            format: 'esm'
        },
        {
            file: 'dist/cjs.js',
            format: "cjs"
        },
        {
            file: 'dist/umd.js',
            name: 'Guang',
            format: "umd"
        }
    ],

    // plugins 里的 typescript 插件是做 ts 代码编译的，postcss 插件是做 css 代码的编译和合并的
    plugins: [
        resolve(),
        commonjs(),
        typescript({
            tsconfig: 'tsconfig.json'
        }),
        postcss({
            // extract: true,
            extract: 'index.css'
        }),
        replace({
            'process.env.NODE_ENV': '"production"'
        })
    ]
};
