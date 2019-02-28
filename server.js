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

function setUserQuery(req) {
  req.query.userName = req.session.userName || "demo";
}
mongoClient.connect(function(err, mongoClient) {
  var db1 = mongoClient.db("tutor");
  if(err) console.log(err);
  else console.log("mongodb opened");

  db1.collection('notes', function (error, notes) {
    db1.notes = notes;
  });

  db1.collection('sections', function (err, sections) {
    db1.sections = sections;
  });

  db1.collection('users', function (error, users) {
    db1.users = users;
  });

  app.post("/users", function (req, res) {
    db1.users.insert(req.body, function (resp) {
      setUserQuery(req);
      req.body.userName = req.session.userName || "demo";
      req.session.userName = req.body.name;
      res.end();
    });
  });

  app.get("/sections", function (req, res) {
    var userName = req.session.userName || "demo";
    db1.users.find({userName: userName}, {$set:{sections:req.body}}).toArray(function (err, items) {
      var user = items[0];
      res.send(user.sections||[]);
    });
  });

  app.post("/sections/replace", function(req,res) {
    var userName = req.session.userName || "demo";
    db1.users.update({userName:userName},
      {$set:{sections:req.body}},
      function() {
        res.end();
      });
  });

  app.get("/notes", function (req, res) {
    setUserQuery(req);
    db1.notes.find(req.query).sort({order: 1}).toArray(function (err, items) {
      res.send(items);
    })
  });
  app.post("/notes", function (req,res) {
    setUserQuery(req);
    req.body.userName = req.session.userName || "demo";
    db1.notes.insert(req.body).then(function () {
      res.end();
    });
  });
  app.delete("/notes", function (req, res) {
    setUserQuery(req);
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

  app.get('/checkUserUnique', function (req, res) {
    setUserQuery(req);
   db1.users.find({userName: req.query.user}).toArray(function (err, items) {
     if (items.length > 0) {
       res.send(false)
     } else {
       res.send(true);
     }
   });
  });

  app.post("/login", function(req,res) {
    db1.users.find(
      {userName:req.body.userName,
        password:req.body.password})
      .toArray(function(err, items) {
        if (items.length>0) {
          req.session.userName = req.body.userName;
        }
        res.send(items.length>0);
      });
  });

  app.get("/logout", function(req, res) {
    req.session.userName = null;
    res.end();
  });

  app.get("*", function (req, res, next) {
    setUserQuery(req);
    res.sendFile('index.html', {root: __dirname + '/dist/notes-app'});
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
