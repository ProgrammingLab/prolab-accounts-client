const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        asset: '[path].br[query]',
        algorithm: 'brotliCompress',
        test: /\.(js|map|css|json|txt|html|ico|svg)(\?.*)?$/i,
        compressionOptions: { level: 11 },
        minRatio: 0.8,
      }),
      new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|map|css|json|txt|html|ico|svg)(\?.*)?$/i,
        compressionOptions: { level: 9 },
        minRatio: 0.8,
      }),
    ],
  },
};
