var express = require('express');
var app = express();
var port = 1390;

app.use(express.static('src'));

app.get('/fs', function(req, res){
  res.send('hw');
});


app.listen(port);
console.log('Listening on port ',port);
