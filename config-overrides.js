const { 
  override,
} = require("customize-cra");

module.exports = {
  webpack: override(
      (config) => {
        config.output.filename = 'static/js/[name].js'
        config.output.chunkFilename = 'static/js/[name].chunk.js'
        config.plugins[0].options.filename = 'server.html'
        // console.log('plugins', config.plugins[0].options);

        // console.log('aaa', Object.keys(config.plugins[0]));
        // const htmlWebpackPlugin = config.plugins.find((plugin) => plugin instanceof HtmlWebpackPlugin);
        // console.log('dd', htmlWebpackPlugin);
        return config;
      }
  )
};