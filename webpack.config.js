import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const outputPath = process.env.OUTPUT_PATH || 'dist';

const requiredEnvVars = [
  'API_BASE_URL',
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'FIREBASE_APP_ID'
];

requiredEnvVars.forEach((key) => {
  if (!process.env[key] && isProduction) {
    throw new Error(`Missing environment variable: ${key}`);
  }
});

const config = (env, argv) => {
  const isDev = argv.mode === 'development';

  return {
    entry: '/src/index.js',
    output: {
      path: path.resolve(__dirname, outputPath),
      filename: 'bundle.js',
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          }
        },
        {
          test: /\.css$/i,
          exclude: /node_modules/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader'
          ],
        },
        {
          test: /\.html$/i,
          use: "html-loader",
        }
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
        filename: 'index.html'
      }),
      new MiniCssExtractPlugin({
        filename: 'Main.css'
      }),
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
        'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
        'process.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL),
      })
    ],
    devServer: {
      static: path.resolve(__dirname, outputPath),
      compress: true,
      port: 8080,
      open: true
    },
    devtool: isDev ? 'inline-source-map' : false,
    optimization: {
      concatenateModules: false,
    },
  };
};

export default config;