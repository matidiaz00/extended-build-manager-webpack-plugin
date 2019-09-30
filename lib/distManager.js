var colors = require('colors');
var fs = require('fs-extra');

function copy(arr, callback) {
    var i;
    for (i=0; i<arr.length; i++) {
        fs.copy(arr[i].source, arr[i].destination)
            .then(function () {
                process.stdout.write(`\nThis element has copy succesfully\n`);
                //process.stdout.write(`\n${arr[i].source} has copy in ${arr[i].destination} successfully\n`.green);
                process.stdout.write('\nThis build was done successfully\n'.green);
                callback()
            })
            .catch(function (err) {
                process.stderr.write(err+''.red);
                callback()
            });
    }
}

function del(arr, callback) {
    var i;
    for (i=0; i<arr.length; i++) {
        fs.remove(arr[i])
            .then(function () {
                process.stdout.write(`\nThis element has removed succesfully\n`);
                process.stdout.write('\nThis build was done successfully\n'.green);
                callback()
            })
            .catch(function (err) {
                process.stderr.write(err+''.red);
                callback()
            });
    }
}

module.exports = function(arr, callback) {
    var i;
    for (i=0; i<arr.length; i++) {
        if ( arr[i].hasOwnProperty('delete') ) del(arr[i].delete, callback)
        else if ( arr[i].hasOwnProperty('copy') ) copy(arr[i].copy, callback)
    }
}