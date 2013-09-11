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
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-node-webkit-builder');

    // Default task(s).
    // grunt.registerTask('default', ['uglify']);

};
