var express = require('express');
var app = express();

app.use('/public', express.static('dist'));
app.use('/public', express.static('node_modules/react/umd/'));
app.use('/public', express.static('node_modules/react-dom/umd/'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});