import path from 'path';

import dotenv from 'dotenv';

// Plugins
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import postcssPresetEnv from 'postcss-preset-env';

dotenv.config({ path: path.resolve('./.env') });

const getWebpackConfig = (env) => {
  const isProduction = env.WEBPACK_BUILD;

  const port = process.env.PORT;
  const devPort = process.env.DEV_PORT || 8080;

  return {
    devtool: isProduction ? 'hidden-source-map' : 'source-map',
    entry: {
      app: './src/js/app.js',
    },
    output: {
      path: path.resolve('./public/dist'),
      publicPath: '/dist/',
      filename: '[name].bundle.js',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { importLoaders: 1 },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [postcssPresetEnv()],
                },
              },
            },
          ],
        },
      ],
    },
    optimization: {
      minimizer: ['...', new CssMinimizerPlugin()],
    },
    plugins: [new MiniCssExtractPlugin({ filename: '[name].bundle.css' })],
    devServer: {
      port: devPort,
      watchFiles: ['views'],
      proxy: {
        '*': {
          target: `http://localhost:${port}`,
          secure: false,
        },
      },
      open: true,
    },
  };
};

export default getWebpackConfig;
