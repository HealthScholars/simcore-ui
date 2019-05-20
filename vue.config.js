// Vuetify IE11 & Safari 9 support
// https://vuetifyjs.com/en/getting-started/quick-start#ie11-safari-9-support

module.exports = {
  transpileDependencies:[/node_modules[/\\\\]vuetify[/\\\\]/]
}

// const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new VuetifyLoaderPlugin()
    ]
  }
}
