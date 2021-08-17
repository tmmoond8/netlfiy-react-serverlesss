const { 
  override,
} = require("customize-cra");

module.exports = {
  webpack: override(
      (config) => {
        console.log(config);
        config.output.filename = 'static/js/[name].js'
        config.output.chunkFilename = 'static/js/[name].chunk.js'
        return config;
      }
  )
};