const path = require('path');

module.exports = {
    entry: './src/background.js',
    output: {
        filename: 'background.js',
        path: path.resolve(__dirname, 'js'),
    },
    module: {
        rules: [
            {
                test: /\.(glsl|vert|frag)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'raw-loader',
                    },
                    {
                        loader: 'glslify-loader',
                    },
                ],
            },
            {
                test: /\.jpg$/i,
                loader: 'url-loader',
            },
        ],
    },
};
