// Rollup + Terser for Gulp, Version 1

const through = require('through2'),
    rollup = require('rollup'),
    terser = require('rollup-plugin-terser').terser,
    nodeResolve = require('@rollup/plugin-node-resolve').nodeResolve,
    devOptions = require('./options'),
    path = require("path");

// ----

function __rollup(file, output, terserOptions) {
    return rollup.rollup({
        input: file,
        plugins: [terser(terserOptions), nodeResolve()]
    })
        .then(bundle => {
            return bundle.write({
                file: output,
                format: 'es',
                name: 'bundle',
                sourcemap: false
            });
        })
}

// ----

module.exports = function (options) {
    let defaults = {
        dest: null,
        terser: {}
    }

    const opts = Object.assign(defaults, options); // Merge options

    return through.obj(function (file, encoding, callback) {
        const destination = opts.dest === null ? devOptions.paths.dist.js + path.basename(file.path, file.extname) + '.min' + file.extname : opts.dest;
        __rollup(file.path, destination, opts.terser);
        callback(null, file);
    });
} // rollup();