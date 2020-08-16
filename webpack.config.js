const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const srcPath = './src';
const distPath = 'dist';

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };
  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin(),
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: isDev,
        uglifyOptions: {
          output: {
            comments: false,
          },
          compress: {
            drop_console: true,
          },
        },
      }),
    ];
  }
  return config;
};

const fileName = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const cssLoaders = (extra) => {
  const loaders = [
    'style-loader',
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true,
        publicPath: '../../',
      },
    },
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: isDev,
        plugins: () => [autoprefixer()],
      },
    },
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

const babelOptions = (preset) => {
  const opts = {
    presets: [
      ['@babel/preset-env', { targets: { browsers: ['last 7 versions'] } }],
      '@babel/preset-react',
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-jsx',
    ],
  };

  if (preset) {
    opts.presets.push(preset);
  }

  return opts;
};

const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions(),
  }];

  if (isDev) {
    loaders.push('eslint-loader');
  }

  return loaders;
};

const plugins = () => {
  const base = [
    new HTMLWebpackPlugin({
      template: './public/index.html',
      minify: {
        collapseWhitespace: isProd,
        removeComments: isProd,
      },
      filename: './index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, './public/favicon.ico'),
        to: path.resolve(__dirname, distPath),
      },
      {
        from: path.resolve(__dirname, `${srcPath}/assets`),
        to: path.resolve(__dirname, `${distPath}/assets`),
      },
    ]),
    new MiniCssExtractPlugin({
      filename: 'static/styles/[name].[contenthash:8].css',
      chunkFilename: 'static/styles/[name].[contenthash:8].chunk.css',
    }),
    new Dotenv(),
  ];

  return base;
};

module.exports = {
  context: path.resolve(__dirname, './'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', `${srcPath}/index.js`],
  },
  output: {
    filename: `static/js/${fileName('js')}`,
    path: path.resolve(__dirname, distPath),
  },
  resolve: {
    extensions: ['.js', '.json', '.png', '.ttf', 'woff', 'woff2'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimization: optimization(),
  devServer: {
    contentBase: path.join(__dirname, distPath),
    compress: true,
    port: 3001,
    useLocalIp: true,
    host: '0.0.0.0',
    hot: isDev,
    open: true,
    watchContentBase: true,
    historyApiFallback: true,
    https: true,
  },
  devtool: isDev ? 'source-map' : '',
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/i,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'static/media/[name]-[contenthash].[ext]',
        },
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        loader: 'file-loader',
        options: {
          name: 'static/fonts/[name]-[contenthash].[ext]',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-react'),
        },
      },
    ],
  },
};
