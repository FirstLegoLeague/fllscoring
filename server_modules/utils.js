exports.root = __dirname + '/../';

exports.sendError = function(res) {
    return function(err) {
        res.status(err.status).send(err.message);
    }
}

if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) { 
            return typeof args[number] !== 'undefined' ? args[number] : match;
        });
    };
}
