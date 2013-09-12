define(['services/fs'],function(fs) {
    fs.read('foo/bar.txt').then(function(data) {
        console.log(data);
    });
    // alert('hello fll scoring');
});
