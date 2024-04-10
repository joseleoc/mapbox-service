var path = require("path");

module.exports = {
  entry: "./test/index.js",
  output: {
    path: path.resolve(__dirname+'/test'),
    filename: "_bundle.js",
  },
};
