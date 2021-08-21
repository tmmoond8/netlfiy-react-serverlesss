const { 
  override,
} = require("customize-cra");

module.exports = {
  webpack: override(
      (config) => {
        config.output.filename = 'static/js/[name].b.js'
        config.output.chunkFilename = 'static/js/[name].chunk.b.js'
        return config;
      }
  )
};