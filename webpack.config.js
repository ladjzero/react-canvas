module.exports = {
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.(js|ts)x?$/,
      loader: 'babel-loader',
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
};
