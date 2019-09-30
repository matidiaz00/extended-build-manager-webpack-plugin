var LoopBuild = require('./main.js');
var WebpackProgress = require('./webpackProgress.js');

class ExtendedBuildManagerWebpackPlugin {

    constructor(build) {
        this.build = build
    }

    apply(compiler) {
        WebpackProgress.apply(compiler);
        LoopBuild(this.build.onStart, this.build.onEnd, compiler);
    }

}

module.exports = ExtendedBuildManagerWebpackPlugin;