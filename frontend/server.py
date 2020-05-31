var express = require('express')
var app     = express();
var cors = require('cors');
///app.use(cors);
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendfile('index.html');
});

///Skill Management
app.get('/skills', function (req, res) {
    res.sendfile('./public/manageskill.html');
});

///Skill Management
app.get('/tasks', function (req, res) {
    res.sendfile('./public/managetasks.html');
});

///Processor management
app.get('/processors', function (req, res) {
    res.sendfile('./public/manageprocessor.html');
});

//decision
app.get('/decide', function (req, res) {
    res.sendfile('./public/decision.html');
});

app.listen(3000, () =>{
  console.log("Running server at port 3000");
});

app.get('/test', function (req, res) {
    console.log(req.param.length);
    res.json({ "Name": "Debdeep" });
});

