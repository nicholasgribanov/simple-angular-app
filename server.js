var express = require('express');
var app = express();
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
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
app.get("/notes", function (req, res) {
  console.log("reading notes", req.session.notes);
  if(!req.session.notes){
    req.session.notes = notes_init;
  }
  res.send(req.session.notes);
});
console.log('ha');
app.post("/notes", function (req,res) {
  var note = req.body;
  console.log("adding note", req.session.notes);
  req.session.notes.push(note);
  res.end();
});
console.log('ha');
app.listen(8080);
