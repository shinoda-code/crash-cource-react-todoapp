const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ProvidePlugin } = require('webpack');

module.exports = ({outputFile, assetFile}) => ({
    entry: {
      
        index:'./src/js/index.js',
        
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: `${outputFile}.js`,
        chunkFilename: `${outputFile}.js`,
        assetModuleFilename: 'images/[hash][ext][query]' 
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',

                options: {
                    fix: true
                }
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env","@babel/preset-react"]
                }
            },

            //tsloader
            // {
            //     test: /\.ts$/,
            //     loader: 'ts-loader'
            // },
            
            {
                test: /\.scss$/,
                use: [
                    // 'style-loader',
                     MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|woff2?|ttf|eot)$/,
                type: 'asset/resource',
                generator: {
                    filename: `./images/${assetFile}.[ext]`,
                },
            },
                {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                }                
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin ({
            filename: `${outputFile}.css` //分割
        }),
        new HtmlWebpackPlugin ({
            template: './src/index.html',
            inject: 'body', //分割
        }),
        new ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            utils: [path.resolve(__dirname, 'src/js/utils'), 'default']
        }),
    ],
    optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 0,

          cacheGroups: {
            defaultVendors: {
              name: "vendors",
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            utils: {
                name: "utils",
                test: /src[\\/]/,
                chunks: 'async'
            },
            default:false
          },
        }
    },
    resolve: {
        mainFields: ['browser', 'module', 'main'],
        alias: {
            '@scss':[ path.resolve(__dirname, 'src/scss')],
            '@imgs': path.resolve(__dirname, 'src/images')
        },
        extensions: [ '.jsx', '.js', 'scss'],
        modules: [path.resolve(__dirname, 'src'),'node_modules'],
    }
});