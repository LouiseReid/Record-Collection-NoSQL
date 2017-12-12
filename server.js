var express = require('express');
var parser = require('body-parser');
var app = express();
var path = require("path");
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use(express.static('client/build'));

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/record_collection', function(err, client){
  if(err){
    return console.log(err);
  }
  db = client.db('record_collection');
  console.log('Connected to db');

  app.listen(3000, function(){
    console.log("Listening on port 3000");
  });
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/build/index.html');
});

app.get('/records', function(req, res){
  db.collection('records').find().toArray(function(err, results){
    if(err){
      return console.log(err);
    }
    res.json(results);
  })
});

app.post('/records', function(req, res){
  db.collection('records').save(req.body, function(err, result){
    if(err){
      return console.log(err);
    }
    console.log('saved to db');
    res.redirect('/');
  })
});

app.post('/delete', function(req, res){
  db.collection('records').remove()
  res.redirect('/')
})
