const path = require('path');

module.exports = {
    entry: [
        "webpack-dev-server/client?http://127.0.0.0:8000/",
        "webpack/hot/only-dev-server",
        "./src/app"
      ],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
    },
    devServer: {
        port: 8000,
        publicPath: "http://localhost:8000",
        contentBase: "./src",
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  "style-loader",
                  "css-loader",
                  "sass-loader",
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
            },
            {
                test: /\.obj$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            encoding: false
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
}