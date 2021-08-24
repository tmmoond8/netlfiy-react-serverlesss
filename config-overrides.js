const { 
  override,
} = require("customize-cra");

module.exports = {
  webpack: override(
      (config) => {
        config.output.filename = 'static/js/[name].js'
        config.output.chunkFilename = 'static/js/[name].chunk.js'
        config.plugins[0].options.filename = 'server.html'
        return config;
      }
  )
};