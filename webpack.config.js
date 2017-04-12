const path = require('path');
const webpack = require('webpack');

const settings = {
    entry:{
        bundle:[
            './src/index.js'
        ]
    },
    output: {
        filename: 'bundle.js',
        publicPath: '/',
        path: path.resolve('build') 
    },
    module:{
        rules:[
                  {
                    test: /\.js?$/,
                    loader: 'babel-loader',
                    options: {
                      presets: [
                        ["es2015", { modules: false }],
                        "stage-2",
                        "react"
                      ],
                      plugins: [
                        "transform-node-env-inline"
                      ],
                      env: {
                        development: {
                        }
                      }
                    }
                  },
                        {
                test: /\.css$/,
                use: [
                  "style-loader",
                  {
                    loader: "css-loader",
                    options: {
                      modules: true,
                      sourceMap: true,
                      importLoaders: 1,
                      localIdentName: "[name]--[local]--[hash:base64:8]"
                    }
                  },
                  "postcss-loader" // has separate config, see postcss.config.js nearby
                ]
              },


        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
                compress: {warnings: false},
                output: {comments: false}
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.LoaderOptionsPlugin({debug: true})
    ]

}


module.exports = settings;
