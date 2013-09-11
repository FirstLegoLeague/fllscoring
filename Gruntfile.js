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
                    appId: "547261",
                    user: {
                        email: 'rikkert@rikkertkoppes.com'
                    },
                    download: {
                        // ios: 'dist/ios.ipa',
                        android: 'dist/android.apk'
                    }
                }
            },
            release: {
                options: {
                    archive: "temp/app.zip",
                    appId: "547261",
                    user: {
                        email: 'rikkert@rikkertkoppes.com'
                    },
                    download: {
                        // ios: 'dist/ios.ipa',
                        android: 'dist/android.apk'
                    }
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.loadNpmTasks('grunt-phonegap-build');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('phonegap', ['compress', 'phonegap-build:debug']);

    // Default task(s).
    // grunt.registerTask('default', ['uglify']);

};
