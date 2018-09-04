const path = require('path')
const root = '../..'
const shared = [
  'assets',
  'components',
  'layout',
  'middleware',
  'plugins',
  'static',
  'store'
]

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-multiple-app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '{{escape description }}' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {
    color: '#3B8070'
  },
  /*
  ** Global CSS
  */
  css: [
    { src: `${root}/assets/scss/style.scss`, lang: 'scss' }
  ],
  /*
  ** Global Plugin
  */
  plugins: [
    { src: `${root}/plugins/vuex.js`, ssr: false }
  ],
  /*
  ** Global Module
  */
  modules: [
    'bootstrap-vue/nuxt'
  ],
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      shared.map(item => {
        config.resolve.alias[item] = path.resolve(__dirname, item)
      })

      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })

        const vueLoader = config.module.rules.find(({loader}) => loader === 'vue-loader')
        const { options: {loaders} } = vueLoader || { options: {} }

        if (loaders) {
          for (const loader of Object.values(loaders)) {
            changeLoaderOptions(Array.isArray(loader) ? loader : [loader])
          }
        }

        config.module.rules.forEach(rule => changeLoaderOptions(rule.use))
      }
    }
  }
}

const changeLoaderOptions = (loaders) => {
  if (loaders) {
    for (const loader of loaders) {
      if (loader.loader === 'sass-loader') {
        Object.assign(loader.options, {
          includePaths: ['./assets']
        })
      }
    }
  }
}