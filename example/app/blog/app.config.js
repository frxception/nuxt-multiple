const config = require('../../nuxt.config.js')
const extend = {
  /**
   * Define source directory
   */
  srcDir: __dirname,
  /**
   * Define build target
   */
  buildDir: '.nuxt/blog'
}

/**
 * Export config
 */
module.exports = Object.assign(extend, config)