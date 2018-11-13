const fs = require('fs-extra')
const path = require('path')
const opn = require('opn')

const { ConcatSource } = require("webpack-sources")

const getPort = require('../../../utils/get-port')
const { filenameDll } = require('../../../defaults/before-build')

let opened = false

class DevServerAfter {
    constructor({
        after,
        dist
    }) {
        this.after = after
        this.dist = dist
    }

    apply(compiler) {
        const after = this.after
        const TYPE = process.env.WEBPACK_BUILD_TYPE
        const ENV = process.env.WEBPACK_BUILD_ENV
        const STAGE = process.env.WEBPACK_BUILD_STAGE

        // [server / dev] 如果存在 DLL 结果，写入到 index.js 文件开端
        if (STAGE === 'server' && ENV === 'dev') {
            compiler.hooks.compilation.tap("DevServerAfter", compilation => {
                compilation.hooks.optimizeChunkAssets.tap("DevServerAfter", chunks => {
                    if (typeof this.dist !== 'string' || !this.dist)
                        return

                    const fileDll = path.resolve(this.dist, 'server', filenameDll)
                    if (!fs.existsSync(fileDll))
                        return

                    for (const chunk of chunks) {
                        if (!chunk.canBeInitial()) {
                            continue
                        }
                        chunk.files
                            .filter(filename => filename === 'index.js')
                            .forEach(filename => {
                                compilation.assets[filename] = new ConcatSource(
                                    fs.readFileSync(fileDll, 'utf-8'),
                                    '\n',
                                    compilation.assets[filename]
                                )
                            })
                    }
                })
            })
        }

        // hook: done
        // 执行 after 回调，并打开浏览器窗口
        compiler.hooks.done.tapAsync.bind(compiler.hooks.done, 'DevServerAfter')((compilation, callback) => {
            if (typeof after === 'function')
                setTimeout(() => {
                    after()
                    console.log('\n')
                })

            if (TYPE === 'spa') {
                if (!opened) opn(`http://localhost:${getPort()}/`)
                opened = true
            }

            callback()
        })
    }
}

module.exports = DevServerAfter
