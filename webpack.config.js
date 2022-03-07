const path = require('path')
var HardSource=require('hard-source-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, 'src/js', 'App.js'),

	plugins:[new HardSource()],
  devServer: {
    contentBase: path.join(__dirname, 'src'),
     historyApiFallback: true,
     host:'192.168.0.105',
     port:'8080',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader','css-loader'],
        include: [/src/, /node_modules/]
      }, {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      }, {
        test: /\.json$/,
        loader: 'json-loader',
        include: '/build/contracts/'
      },{
		  test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
      loader: 'url-loader?limit=100000'
	  }
    ]
  },
	
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
}

}
