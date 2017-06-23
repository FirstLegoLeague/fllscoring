var args = require('./args');

exports.configure = function() {
	
	if(args.slaveMode) {
		// Shut down this process when we detect that the parent is gone.
	    // This is useful when being spawned through e.g. `fllproxy`.
	    // Note that this also works when the parent is killed by e.g. SIGKILL.
	    process.stdin.resume();
	    process.stdin.on('end', function() {
	        process.exit();
	    });
	}

};