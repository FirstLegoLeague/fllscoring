"use strict";

module.exports = {
    scripts: "./src/**/*.js",
    assets: ["./src/**/*",
           "./challenges/**/*"],
    dirs:  ["./src",
          "./src/data",
          "./challenges"],
    users: [{
        username: 'admin',
        password: 'admin',
        pages: ['scoresheet','teams','scores','ranking','settings']
    }]
};
