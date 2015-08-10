module.exports = {
  entry: {
    javascript: "./example/index.js",
    html: "./example/index.html",
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
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.(png|svg|ttf|woff|woff2|eot)$/, loader: 'url-loader?limit=100000' },
      { test: /\.html$/, loader: "file?name=[name].[ext]" },
    ],
  },
}