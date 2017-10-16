var lockfile = require('lockfile');
var utils = require('./utils');
var fileSystem = require('./file_system');
var authorize = require('./auth').authorize;
var Q = require('q');

exports.filterPublished = function(score) {
    return score.published;
}

exports.reduceToMap = function(key) {
    return function(arr) {
        return arr.reduce(function(map,record) {
            map[record[key]] = record;
            return map;
        },{});
    }
}

// This function is meant to lock the ability to change the scores.json file, using lockfile and a promise chain
exports.changeScores = function(action) {
    return new Promise(function(res, rej) {
        var path = fileSystem.getDataFilePath('scores.json');
        lockfile.lock('scores.json.lock', { retries: 5, retryWait: 100 }, function (err) {
            if(err) rej(err);
            fileSystem.readJsonFile(path)
            .catch(function(err) {
                if(err.message === 'file not found') {
                    return { version:3, scores: [] };
                } else {
                    throw err;
                }
            })
            .then(action)
            .then(function(scores) {
                return fileSystem.writeFile(path, JSON.stringify(scores)).then(function() {
                    lockfile.unlock('scores.json.lock', function(err) {
                        if(err) rej(err);
                    });
                    return scores;
                }).catch(function() {
                    lockfile.unlock('scores.json.lock', function(err) {
                        if(err) rej(err);
                    });
                    return scores;
                });
            }).then(res).catch(rej);
        });
    });
}
