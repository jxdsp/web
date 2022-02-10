// import {rollup, watch, defineConfig} from "rollup";
// import {minify} from "html-minifier-terser";
// import {terser} from "rollup-plugin-terser";
const {rollup, watch, defineConfig} = require('rollup')
const {terser} = require('rollup-plugin-terser')
const minify = require('html-minifier-terser')
const del = require('rollup-plugin-delete')

const {log, logSuccess, logError, logWarn, logBgRed, logBgGreen, logBgYellowBright, logBgOrange} = require('./chalk')

log('Success!')
log(logBgRed('Success!'))
log(logBgGreen('Success!'))
log(logBgYellowBright('Success!'))
log(logBgOrange('Success!'))

log(logSuccess('Success!'))
log(logError('Error!'))
log(logWarn('Warn!'))

const delPublic = [
    'public'
]

const terserOptions = {}

const inputOptions = {
    input: 'src/components/index.esm.js',
    plugins: [
        del({
            targets: delPublic,
            hook: 'buildStart'
        })
    ],
    external: ['bootstrap']
}


// 您可以从同一输入创建多个输出以生成例如不同的格式，如 CommonJS 和 ESM
const outputOptions = {
    name: 'bComponents',
    format: 'iife',
    dir: 'public/js', // file: 'public/js'
    plugins: [
        terser(terserOptions)
    ],
    globals: {
        'bootstrap': 'bootstrap'
    },
}

const outputOptionsList = [outputOptions]

const rollupOptions = {
    outputOptionsList,
}


build()
    .then(() => {
            log(logSuccess('\n'))
            log(logBgGreen(' Build OK '))
            log(logSuccess('\n'))
        }
    )
    .catch(error => log(logError(error)))

async function build() {
    // 创建一个捆绑包
    const bundle = await rollup(inputOptions)

    log(bundle)
    log(bundle.watchFiles)

    // 生成代码和源图
    const {code, map} = await bundle.generate(outputOptions)

    // 或将捆绑包写入磁盘
    await bundle.write(outputOptions)
}

const watchOptions = {}
const watcher = watch(watchOptions)

function jsWatcher() {
    // stop watching
    watcher.close()
}
