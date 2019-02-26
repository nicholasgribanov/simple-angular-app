var express = require('express');
var app = express();
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
//MONGO DB
var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var mongoClient = new MongoClient(new Server('localhost', 27017));
var ObjectId = require('mongodb').ObjectID;
console.log(MongoClient.prototype);
mongoClient.connect(function(err, mongoClient) {
  var db1 = mongoClient.db("tutor");
  if(err) console.log(err);
  else console.log("mongodb opened");

  db1.collection('notes', function (error, notes) {
    db1.notes = notes;
  });

  app.get("/notes", function (req, res) {
    db1.notes.find(req.query).sort({order: 1}).toArray(function (err, items) {
      res.send(items);
    })
  });
  app.post("/notes", function (req,res) {
    db1.notes.insert(req.body).then(function () {
      res.end();
    });
  });
  app.delete("/notes", function (req, res) {
    var id = new ObjectId(req.query.id);
    db1.notes.remove({_id: id}, function (err) {
      if(err){
        console.error(err);
        res.send({ok: false});
      } else {
        res.send({ok: true});
      }
    });
  });

});


var notes_init = [
  {text: "First Node s"},
  {text: "Second Node s"},
  {text: "Third Node s"}
];


app.use(express.static(path.join(__dirname, '/dist/notes-app')));
app.use(bodyParser.json());
console.log(__dirname);
app.use(session({
  secret: 'angular-tutor',
  resave: true,
  saveUninitialized: true
}));
console.log('ha');

console.log('ha');

console.log('ha');
app.listen(8080);
