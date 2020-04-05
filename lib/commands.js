var colors = require('colors');
var spawn = require('child_process').spawn;

module.exports = function(arr, callback) {
    var commandList = arr.slice(1, arr.length);
    var command = spawn(arr[0], commandList, { shell: true });
    command.stdin.on('data', function(data) {
        process.stdin.write(data);
    });
    command.stdout.on('data', function(data) {
        process.stdout.write(data);
    });
    command.stderr.on('data', function(data) {
        process.stderr.write(data + '' .red);
    });
    command.on('error', function () {
        process.stderr.write("\nFailed to start this build\n" .red);
        callback()
    });
    command.stdout.on('close', function () {
        // Remove exit from here
    });
    command.on('exit', function (code) {
        if (code !== 0){ process.stderr.write("\nFailed to start this build\n" .red); }
        else { process.stdout.write('\nThis build was done successfully\n' .green); }
        callback()
    });
}