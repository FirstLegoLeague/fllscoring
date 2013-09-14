Templating
==========

We use [angularjs](http://angularjs.org) to include views. All index pages include the main view (`views/main.html`)

The `main.js` should be responsible for loading angular modules

We may make `main.js` aware of:

- the viewport size, to load variants of `main.html` to be able to adapt to the viewport size
- the target platform (desktop/mobile) to be able to include desktop only functionality
