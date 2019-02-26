// webpack.config.js
const Encore = require('@symfony/webpack-encore');
const path = require('path');


Encore
// the project directory where all compiled assets will be stored
    .setOutputPath('web/assets/')

    // the public path used by the web server to access the previous directory
    .setPublicPath('/assets')

    .addEntry('common', './src/AppBundle/Resources/public/javascript/common.js')

    .addEntry('main', [
        './src/AppBundle/Resources/public/javascript/main/main.js'
    ])

    .addEntry('ca', [
        './src/AppBundle/Resources/public/javascript/ca/ca.api.js',
        './src/AppBundle/Resources/public/javascript/ca/ca.api.content.js',
        './src/AppBundle/Resources/public/javascript/ca/ca.data.js',
        './src/AppBundle/Resources/public/javascript/ca/ca.utils.js',
    ])

    .addAliases({
        '@components': path.resolve(__dirname, 'src/AppBundle/Resources/public/javascript/common/components/'),
        '@utils': path.resolve(__dirname, 'src/AppBundle/Resources/public/javascript/common/utils/'),
        '@constants': path.resolve(__dirname, 'src/AppBundle/Resources/public/javascript/common/constants.js'),
        '@icons': path.resolve(__dirname, 'src/AppBundle/Resources/public/javascript/main/components/Icons.js'),
    })

    // allow legacy applications to use $/jQuery as a global variable
    .autoProvidejQuery()

    .enableReactPreset()

    .enableSassLoader()

    .configureBabel((config) => {
        //config.presets.push('@babel/stage-2');
        //config.presets.push('@babel/env');
        //config.presets.push('@babel/react');
        config.plugins.push('@babel/plugin-proposal-class-properties');
        config.plugins.push('@babel/plugin-transform-regenerator');
        config.plugins.push(["@babel/plugin-transform-async-to-generator", {
            "module": "bluebird",
            "method": "coroutine"
        }]);
        config.plugins.push('@babel/plugin-transform-runtime');
    })

    .createSharedEntry('vendor', './src/AppBundle/Resources/public/javascript/vendor.js')

    .enableSourceMaps(!Encore.isProduction())

    .enableSingleRuntimeChunk()

    // empty the outputPath dir before each build
    .cleanupOutputBeforeBuild()

    // show OS notifications when builds finish/fail
    //.enableBuildNotifications()

    // create hashed filenames (e.g. app.abc123.css)
    // .enableVersioning()
;

// export the final configuration
module.exports = Encore.getWebpackConfig();