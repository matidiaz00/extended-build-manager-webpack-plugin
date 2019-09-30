var colors = require('colors');
var distManager = require('./distManager.js');
var command = require('./commands.js');

module.exports.onStart = function(obj, compiler, title, description, id, totalLength) {
    compiler
    .hooks
    .beforeCompile
    .tapAsync(obj.name, function (compilationParams, callback) {
        process.stdout.write(`\n${Number(id) + 1}/${totalLength} - ${title}\n`.yellow);
        process.stdout.write(`${description}\n`.gray);
        if ( obj.hasOwnProperty('command') ) command(obj.command.split(" "), callback)
        else if ( obj.hasOwnProperty('distManager') ) distManager(obj.distManager, callback)
    });
}

module.exports.middle = function(obj, compiler, title, description, id, totalLength) {
    compiler
    .hooks
    .beforeCompile
    .tapAsync(obj.name, function (compilationParams, callback) {
        process.stdout.write(`\n${Number(id) + 1}/${totalLength} - ${title}\n`.yellow);
        process.stdout.write(`${description}\n`.gray);
        callback();
    });
    compiler
    .hooks
    .afterEmit
    .tapAsync(obj.name, function (compilation, callback) {
        process.stdout.write('\nThis build was done successfully\n'.green);
        callback()
    });
}

module.exports.onEnd = function(obj, compiler, title, description, id, totalLength) {
    compiler
    .hooks
    .done
    .tapAsync(obj.name, function (stats, callback) {
        process.stdout.write(`\n${Number(id) + 1}/${totalLength} - ${title}\n`.yellow);
        process.stdout.write(`${description}\n`.gray);
        if ( obj.hasOwnProperty('command') ) command(obj.command.split(" "), callback)
        else if ( obj.hasOwnProperty('distManager') ) distManager(obj.distManager, callback)
    });
}