

function getPhonegapConfig() {
    var configPath = './pgbuildconfig.json';
    var fs = require('fs');
    if (fs.existsSync(configPath)) {
        var pgbuildconfig = require(configPath);
        return {
            username: pgbuildconfig.username,
            password: pgbuildconfig.password,
            platforms: ['ios', 'android','wp8']
        };
    } else {
        return {};
    }
}

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        nwjs: { // nw.js, formerly known as "node-webkit"
            options: {
                buildDir: './nw-builds', // output folder for nwjs apps
                cacheDir: './nw-cache',
                platforms: ['win', 'osx64', 'linux'],
                version: 'v0.12.0' // nwjs version to use
            },
            src: ['./src/**/*'] // Your node-wekit app
        },

        compress: {
            main: {
                options: {
                    archive: 'temp/app.zip'
                },
                files: [{
                    expand: true,
                    src: ['**'],
                    cwd: 'src/',
                    dest: '/'
                }]
            }
        },

        "phonegap": {
            config: {
                root: "src",
                config: "src/config.xml",
                html: "fgindex.html",
                name: function(){
                    var pkg = grunt.file.readJSON('package.json');
                    return pkg.name;
                },
                debuggable: true,
                releases: 'releases',
                platforms: ['ios', 'android','wp8'],
                plugins: [
                    'org.apache.cordova.file'
                ],
                verbose: true,
                releaseName: function(){
                    var pkg = grunt.file.readJSON('package.json');
                    return(pkg.name + '-' + pkg.version);
                },
                remote: getPhonegapConfig()
            }
        },

        karma: {
            options: {
                configFile: 'karma.conf.js',
            },
            unit: {
                runnerPort: 9999,
                singleRun: true,
                browsers: ['Chrome']
            }
        },

        saxon: {
            options: {
                saxonPath: 'tools/saxon9he.jar',
                xslPath: 'challenges/xsl/challenge.xsl'
            },
            files: {
                src: 'challenges/xml/*.xml',
                dest: 'challenges/html/'
            }
        },

        'http-server': {
            'dev': {
                root: "challenges/html/",
                port: 8282,
                host: "127.0.0.1",
                // cache: < sec > ,
                // showDir: true,
                // autoIndex: true,

                // server default file extension
                ext: "html",

                // run in parallel with other tasks
                runInBackground: true
            }
        },

        phantomJSScreenShot: {
            options: {
                phantomPath: 'node_modules/.bin/phantomjs',
                address: "http://127.0.0.1:8282/"
            },
            files: {
                src: 'challenges/html/*.html',
                dest: 'challenges/pdf/'
            }
        },

        jsChallenge: {
            options: {

            },
            files: {
                src: 'challenges/xml/*.xml',
                dest: 'challenges/js/'
            }
        }
    });

    grunt.loadNpmTasks('grunt-nw-builder');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-phonegap');

    grunt.registerTask('phonegap', ['phonegap:login', 'phonegap:build', 'phonegap:logout']);
    grunt.registerTask('phonegap:ios', ['phonegap:login', 'phonegap:build:ios', 'phonegap:logout']);
    grunt.registerTask('phonegap:android', ['phonegap:login', 'phonegap:build:android', 'phonegap:logout']);
    grunt.registerTask('phonegap:wp8', ['phonegap:login', 'phonegap:build:wp8', 'phonegap:logout']);
    grunt.registerTask('html', ['saxon']);
    grunt.registerTask('js', ['jsChallenge']);
    grunt.registerTask('pdf', ['saxon','http-server', 'phantomJSScreenShot']);
    grunt.registerTask('challenge', ['js', 'pdf']); //html is generated with pdf

    grunt.registerMultiTask('jsChallenge', function() {
        var options = this.options();
        var npath = require('path');
        var nfs = require('fs');
        var Q = require('q');
        var done = this.async();
        var exec = require('child_process').exec;

        function process(filepath,dest) {
            return Q.promise(function(resolve,reject) {
                var base = npath.basename(filepath, '.html');

                var cmd = [
                    'node',
                    '"tools/buildchallenge.js"',
                    '"' + filepath + '"',
                    '>',
                    '"' + dest + '"'
                ].join(' ');

                // console.log(cmd);
                // resolve()
                exec(cmd, function(error, stdout, stderr) {
                    if (error !== null) {
                        console.log('exec error: ' + error);
                        reject(error);
                    }
                    resolve();
                });
            });
        }

        this.files.forEach(function(f) {
            f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function(filepath) {
                return function() {
                    var base = npath.basename(filepath, '.xml');
                    var dest = npath.resolve(f.dest, base) + '.js';
                    // console.log(filepath);
                    // console.log(dest);
                    return process(filepath,dest);
                };
            }).reduce(function(pending,promise) {
                return pending.then(promise);
            },Q()).then(done,done);
        });
    });

    grunt.registerMultiTask('saxon', function() {
        var options = this.options();
        var saxonPath = options.saxonPath;
        var xslPath = options.xslPath;
        var npath = require('path');
        var nfs = require('fs');
        var Q = require('q');
        var saxon = require('saxon-stream2');
        var done = this.async();

        function process(filepath,dest) {
            return Q.promise(function(resolve,reject) {
                var xslt = saxon(saxonPath, xslPath, {
                    timeout: 5000
                });
                nfs.createReadStream(filepath, {
                    encoding: 'utf-8'
                })
                    .pipe(xslt)
                    .on('error', function(err) {
                        console.log('xslt error:',err);
                        reject(err);
                    })
                    .pipe(nfs.createWriteStream(dest))
                    .on('error', function(err) {
                        console.log('write error:',err);
                        reject(err);
                    })
                    .on('finish', function() {
                        console.log('done');
                        resolve();
                    });
            });
        }

        this.files.forEach(function(f) {
            f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function(filepath) {
                return function() {
                    var base = npath.basename(filepath, '.xml');
                    var dest = npath.resolve(f.dest, base) + '.html';
                    // console.log(filepath);
                    // console.log(dest);
                    return process(filepath,dest);
                };
            }).reduce(function(pending,promise) {
                return pending.then(promise);
            },Q()).then(done,done);
        });
    });

    grunt.registerMultiTask('phantomJSScreenShot', function() {
        var options = this.options();
        var phantomPath = options.phantomPath;
        var address = options.address;
        var npath = require('path');
        var nfs = require('fs');
        var Q = require('q');
        var done = this.async();
        var exec = require('child_process').exec;

        function process(filepath,dest) {
            return Q.promise(function(resolve,reject) {
                var base = npath.basename(filepath, '.html');
                dest = npath.resolve(dest, base) + '.pdf';

                var cmd = [
                    '"' + phantomPath + '"',
                    '"tools/rasterize.js"',
                    '"' + address + base + '.html"',
                    '"' + dest + '"',
                    'a4'
                ].join(' ');

                exec(cmd, function(error, stdout, stderr) {
                    if (error !== null) {
                        console.log('exec error: ' + error);
                        reject(error);
                    }
                    resolve();
                });
            });
        }

        this.files.forEach(function(f) {
            f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function(filepath) {
                return function() {
                    return process(filepath,f.dest);
                };
            }).reduce(function(pending,promise) {
                return pending.then(promise);
            },Q()).then(done,done);
        });
    });

    // Default task(s).
    // grunt.registerTask('default', ['uglify']);

};
