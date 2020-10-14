const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const routePath = './routes/';
const app = express();
const path = require('path');
const http = require('http');
var cors = require('cors')

var port = process.env.PORT || 3000;
process.env.HOST = "localhost"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'views/dist/view')));
app.use('/', express.static(path.join(__dirname, 'views/dist/view')));

app.get('/pet-information', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'views/dist/view/index.html'));
});

fs
  .readdirSync(routePath).forEach(function(file) {
    try{
      var routeFile = require(routePath + file);
      app.use('/api', routeFile) ;
    } catch(ex){
      console.log(file,"----err",ex);
    }
});

app.listen(port, process.env.HOST, function(){
    console.log("The server is listening at http://" + process.env.HOST + ":" + port)
});

module.exports = app;
