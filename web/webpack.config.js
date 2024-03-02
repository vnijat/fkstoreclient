const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname, '../');

const babelConfig = require('../babel.config');


// Babel loader configuration
const babelLoaderConfiguration = {
  test: /\.(tsx|jsx|ts|js)?$/,
  exclude: [
    {
      and: [
        // babel will exclude these from transpling
        path.resolve(appDirectory, 'node_modules'),
        path.resolve(appDirectory, 'ios'),
        path.resolve(appDirectory, 'android'),
        path.resolve(appDirectory, 'windows'),
        // path.resolve(appDirectory, "node_modules/@babel")
      ],
      // whitelisted modules to be transpiled by babel
      not: [],
    },
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // Presets and plugins imported from main babel.config.js in root dir
      presets: [...babelConfig.presets, "@babel/preset-react"],
      plugins: ['react-native-web', ...(babelConfig.plugins || []), '@babel/plugin-transform-runtime'],
    },
  },
};

// Image loader configuration
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
      esModule: false,
    },
  },
};


const svgLoaderConfiguration = {
  test: /\.svg$/,
  loader: 'svg-inline-loader'
};

const vectorIconsLoaderConfiguration = {
  test: /\.ttf$/,
  loader: "url-loader", // or directly file-loader
  include: path.resolve(appDirectory, "node_modules/react-native-vector-icons"),
};

module.exports = argv => {
  return {
    entry: path.resolve(appDirectory, 'index.web.js'),
    output: {
      clean: true,
      path: path.resolve(appDirectory, 'web/dist'),
      filename: '[name].[chunkhash].js',
      sourceMapFilename: '[name].[chunkhash].map',
      chunkFilename: '[id].[chunkhash].js',
      publicPath: '/'
    },
    resolve: {
      extensions: [
        '.web.js',
        '.js',
        '.web.ts',
        '.ts',
        '.web.jsx',
        '.jsx',
        '.web.tsx',
        '.tsx',
      ],
    },
    module: {
      rules: [
        babelLoaderConfiguration,
        imageLoaderConfiguration,
        vectorIconsLoaderConfiguration,
        svgLoaderConfiguration
        // fileLoaderConfiguration,
        // tsLoaderConfiguration
      ],
    },
    devServer: {
      historyApiFallback: true,
    },
    plugins: [
      // Plugin that takes public/index.html and injects script tags with the built bundles
      new HtmlWebpackPlugin({
        template: path.resolve(appDirectory, 'web/public/index.html'),
      }),

      // Defines __DEV__ and process.env as not being null
      new webpack.DefinePlugin({
        __DEV__: argv.mode !== 'production' || true,
        process: { env: {} },
      }),],
    optimization: {
      // Split into vendor and main js files
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'initial',
          },
        },
      },
    },
  };
};