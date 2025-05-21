const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = function override(config) {
    config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: require.resolve("path-browserify"),
        stream: require.resolve("stream-browserify"),
        zlib: require.resolve("browserify-zlib"),
        querystring: require.resolve("querystring-es3"),
    };

    config.plugins = (config.plugins || []).concat([
        new NodePolyfillPlugin(),
    ]);

    return config;
};
