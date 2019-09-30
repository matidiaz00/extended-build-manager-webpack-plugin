var webpack = require('webpack');
var readline = require('readline');

module.exports = function() {
    return new webpack.ProgressPlugin({
        entries: true,
        modules: true,
        modulesCount: 100,
        profile: false,
        handler: (percentage, message, ...args) => {
            var percen = (percentage * 100).toFixed();
            var string = args[3] ? (args[3].length < 40) ? args[3] : "..." + args[3].substring(args[3].length -40) : '';
            if (percentage >= 0.9 && percentage <= 0.98) {
                readline.clearLine(process.stdout, 0);
                readline.cursorTo(process.stdout, 0);
                process.stdout.write(`${percen}% ${message} ${args[0]} ${args[1]} ${args[2]} ${string}`);   
            } else if (percentage == 1) {
                readline.clearLine(process.stdout, 0);
                readline.cursorTo(process.stdout, 0);
            }

        }
    })
}