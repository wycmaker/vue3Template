const { defineConfig } = require('@vue/cli-service')
const publishPath = process.env.VUE_PUBLISH_PATH
const outputDir = process.env.VUE_OUTOUT_DIR

module.exports = defineConfig({
  transpileDependencies: true,

  /* #region 發佈路徑配置 */

  publicPath: publishPath,
  outputDir: outputDir,
  assetsDir: './static',
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].inject = false
      return args
    })
  },
  productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,


  /* #endregion */

  /* #region 開發環境跨域設定 */

  devServer: {
    https: true,
    proxy: {
      '/api': {
        target: 'https://localhost:7208',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': '/api'
        }
      },
      '/ChatHub': {
        target: 'https://localhost:7208',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/ChatHub': '/ChatHub'
        }
      }
    }
  }

  /* #endregion */
})