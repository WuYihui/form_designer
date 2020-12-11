const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  devServer: {
    open: false,
    proxy: {
      '/xboot': {
        target: 'http://127.0.0.1:8888',  // 请求本地 需要xboot后台项目
        ws: true
      },
      '/foo': {
        target: '<other_url>'
      }
    }
  },
  assetsDir: 'static',
  productionSourceMap: false,
  publicPath: './',
  configureWebpack: config => {
    let plugins = [
      new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false,
          compress: {
            drop_debugger: false,
            drop_console: true,
          },
        },
        sourceMap: false,
        parallel: true,
      })
    ]
    if (process.env.NODE_ENV !== 'development') {
      config.plugins = [...config.plugins, ...plugins]
    }
  }
}