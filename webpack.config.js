module.exports = {
  context: __dirname + "/example",
  entry: {
    javascript: "./index.js",
    html: "./index.html",
  },
  output: {
    filename: "index.js",
    path: __dirname + "/dist",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["react-hot", "babel-loader"]
      },
      { test: /\.html$/, loader: "file?name=[name].[ext]" },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.(png|svg|ttf|woff|woff2|eot)$/, loader: 'url-loader?limit=100000' },
    ],
  },
}