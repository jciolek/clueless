const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LodashPlugin = require('lodash-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const webpackMerge = require('webpack-merge');
const autoprefixer = require('autoprefixer');

const scssLoaders = [
  {
    loader: 'css-loader',
    options: {
      minimize: true,
      sourceMap: true
    }
  },
  {
    loader: 'resolve-url-loader',
    options: {
      keepQuery: true,
      sourceMap: true
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: true,
      plugins: [autoprefixer]
    }
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true
    }
  }
];

const commonConfig = {
  context: __dirname,
  // Entry is defined per target. See development and production config.
  entry: [],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'js/[name].js?[chunkhash]',
    publicPath: '/'
  },
  plugins: [
    new CleanPlugin(['dist']),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    }),
    new ExtractTextPlugin({
      allChunks: true,
      filename: 'css/styles.css?[chunkhash]'
    }),
    new HtmlPlugin({
      // We don't want the build hash, because we add it to each chunk separately.
      hash: false,
      filename: 'index.html',
      template: 'src/index.ejs'
    }),
    new CopyPlugin([{ from: 'assets/', to: './' }]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/vendor.js?[chunkhash]',
      minChunks: ({ resource }) =>
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: 'js/manifest.js?[hash]',
      minChunks: Infinity
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, 'src')]
      },
      {
        test: /fonts\/.*(\.woff2?$|\.ttf$|\.eot$|\.svg$)/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /img\/.*(\.svg$|\.png$|\.jpg$|\.gif$)/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]?[hash]'
        }
      }
    ]
  }
};

const developmentConfig = {
  entry: ['react-hot-loader/patch', './src/index.js'],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader'].concat(scssLoaders)
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, '/dist'),
    historyApiFallback: true,
    compress: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    },
    watchContentBase: true,
    hot: true
  }
};

const productionConfig = {
  entry: ['./src/index.js'],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: scssLoaders
        })
      }
    ]
  },
  plugins: [
    new LodashPlugin(),
    new UglifyJsPlugin({
      sourceMap: true,
      parallel: true
    })
  ],
  devtool: 'source-map'
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
