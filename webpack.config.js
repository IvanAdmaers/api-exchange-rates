const path = require('path');
const nodeExternals = require('webpack-node-externals');

const getWebpackConfig = (env) => {
  const isProduction = env.WEBPACK_BUILD;
  const mode = isProduction ? 'production' : 'development';

  return {
    entry: path.resolve('./src/app.ts'),
    watch: isProduction,
    mode,
    target: 'node',
    output: {
      path: path.resolve('./build'),
      filename: 'index.js',
    },
    resolve: {
      extensions: ['.webpack.js', '.ts', '.js'],
    },
    module: {
      rules: [
        {
          // test: /\.ts$/,
          test: /\.(ts|js)$/,
          use: ['ts-loader'],
          exclude: /node_modules/,
        },
      ],
    },
    externals: [nodeExternals()],
  };
};

module.exports = getWebpackConfig;
