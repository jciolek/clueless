const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin: CleanPlugin } = require('clean-webpack-plugin');
const webpackMerge = require('webpack-merge');
const autoprefixer = require('autoprefixer');

const scssLoaders = [
  {
    loader: 'css-loader',
    options: {
      sourceMap: true,
    },
  },
  {
    loader: 'resolve-url-loader',
    options: {
      keepQuery: true,
      sourceMap: true,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: true,
      plugins: [autoprefixer],
    },
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
    },
  },
];

const commonConfig = {
  context: __dirname,
  // Entry is defined per target. See development and production config.
  entry: [],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'js/[name].js?[hash]',
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new CleanPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css?[contenthash]',
    }),
    new HtmlPlugin({
      // We don't want the build hash, because we add it to each chunk separately.
      hash: false,
      filename: 'index.html',
      template: 'src/index.ejs',
    }),
    new CopyPlugin([{ from: 'assets/', to: './' }]),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.[jt]sx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.[jt]sx?$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, 'src')],
      },
      {
        test: /fonts\/.*(\.woff2?$|\.ttf$|\.eot$|\.svg$)/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      },
      {
        test: /img\/.*(\.svg$|\.png$|\.jpg$|\.gif$)/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]?[hash]',
        },
      },
    ],
  },
};

const developmentConfig = {
  mode: 'development',
  entry: ['./src/index.tsx'],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, ...scssLoaders],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devtool: 'source-map',
  devServer: {
    host: '0.0.0.0',
    contentBase: path.join(__dirname, '/dist'),
    historyApiFallback: true,
    compress: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    },
    watchContentBase: true,
    hot: true,
  },
};

const productionConfig = {
  mode: 'production',
  entry: ['./src/index.jsx'],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
            },
          },
          ...scssLoaders,
        ],
      },
    ],
  },
  devtool: 'source-map',
};

module.exports = function webpackConfig() {
  const environment = process.env.NODE_ENV || 'development';
  let config = commonConfig;

  if (environment === 'production') {
    config = webpackMerge(config, productionConfig);
  }

  if (environment === 'development') {
    config = webpackMerge(config, developmentConfig);
  }

  return config;
};
