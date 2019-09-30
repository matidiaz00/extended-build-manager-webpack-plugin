var colors = require('colors');
var HooksManager = require('./hooks.js');

module.exports = function(onStart, onEnd, compiler) {
    var id;
    var totalLength = onStart.length + 1 + onEnd.length;
    for (id=0; id<totalLength; id++) {
        if (id < onStart.length) {
            HooksManager.onStart(
                onStart[id],
                compiler,
                onStart[id].title,
                onStart[id].description,
                id,
                totalLength
            )
        } else if (id == onStart.length) {
            HooksManager.middle(
                {name:'Webpack'},
                compiler,
                'Build normal webpack ...',
                'Build the normal compiling webpack',
                id,
                totalLength
            )
        } else if (id > onStart.length && id < onStart.length + 1 + onEnd.length) {
            HooksManager.onEnd(
                onEnd[id - 1 - onStart.length],
                compiler,
                onEnd[id - 1 - onStart.length].title,
                onEnd[id - 1 - onStart.length].description,
                id,
                totalLength
            )
        }
        if (id == totalLength - 1) {
            compiler
            .hooks
            .done
            .tapAsync("Final", function (stats, callback) {
                process.stdout.write('\n\n');
                process.stdout.write(`/##################################################/\n`.cyan);
                process.stdout.write(`/# THIS PROYECT WAS BUILD AND UPDATE SUCCESSFULLY #/\n`.cyan);
                process.stdout.write(`/# PLACE, VISIT ASD FOR CHECK THE NEW CHANGES     #/\n`.cyan);
                process.stdout.write(`/##################################################/\n`.cyan);
                process.stdout.write('\n\n');
                callback()
            });
        }
    }
}