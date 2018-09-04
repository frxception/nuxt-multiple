const config = require('../../nuxt.config.js')
const extend = {
  srcDir: __dirname,
  buildDir: '.nuxt/blog'
}

Object.assign(extend, config)

module.exports = extend