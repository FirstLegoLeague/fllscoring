var pgbuildconfig = require('./pgbuildconfig.json');

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        nodewebkit: {
            options: {
                webkit_src: './webkitbuilds', // Where the build version of my node-webkit app is saved
                mac: true, // We want to build it for mac
                win: true, // We want to build it for win
                linux32: false, // We don't need linux32
                linux64: false // We don't need linux64
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

        "phonegap-build": {
            debug: {
                options: {
                    archive: "temp/app.zip",
                    appId: pgbuildconfig.appId,
                    user: pgbuildconfig.user,
                    download: {
                        // ios: 'dist/ios.ipa',
                        android: 'dist/android.apk'
                    }
                }
            },
            release: {
                options: {
                    archive: "temp/app.zip",
                    appId: pgbuildconfig.appId,
                    user: pgbuildconfig.user,
                    download: {
                        // ios: 'dist/ios.ipa',
                        android: 'dist/android.apk'
                    }
                }
            }
        },

        karma: {
            options: {
                configFile: 'karma.conf.js',
            },
            unit: {
                runnerPort: 9999,
                singleRun: true,
                browsers: ['PhantomJS']
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
        }
    });

    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.loadNpmTasks('grunt-phonegap-build');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-http-server');

    grunt.registerTask('phonegap', ['compress', 'phonegap-build:debug']);
    grunt.registerTask('html', ['saxon']);
    grunt.registerTask('pdf', ['saxon','http-server', 'phantomJSScreenShot']);

    grunt.registerMultiTask('saxon', function() {
        var options = this.options();
        var saxonPath = options.saxonPath;
        var xslPath = options.xslPath;
        var npath = require('path');
        var nfs = require('fs');
        var saxon = require('saxon-stream2');
        var xslt = saxon(saxonPath, xslPath, {
            timeout: 5000
        });
        var done = this.async();

        this.files.forEach(function(f) {
            f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).forEach(function(filepath) {
                var base = npath.basename(filepath, '.xml');
                var dest = npath.resolve(f.dest, base) + '.html';
                // console.log(filepath);
                // console.log(dest);
                nfs.createReadStream(filepath, {
                    encoding: 'utf-8'
                })
                    .pipe(xslt)
                    .pipe(nfs.createWriteStream(dest))
                    .on('error', function(err) {
                        done(err);
                    })
                    .on('finish', function() {
                        console.log('done');
                        done();
                    });
            });
        });
    });

    grunt.registerMultiTask('phantomJSScreenShot', function() {
        var options = this.options();
        var phantomPath = options.phantomPath;
        var address = options.address;
        var npath = require('path');
        var nfs = require('fs');
        var done = this.async();
        var exec = require('child_process').exec;

        this.files.forEach(function(f) {
            f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).forEach(function(filepath) {
                var base = npath.basename(filepath, '.html');
                var dest = npath.resolve(f.dest, base) + '.pdf';

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
                    }
                    done();
                });
            });
        });
    });

    // Default task(s).
    // grunt.registerTask('default', ['uglify']);

};
