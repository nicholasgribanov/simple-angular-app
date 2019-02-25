var express = require('express');
var app = express();
var path = require('path');

app.listen(8080);

app.get("/notes", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-type, X-Requested-With");
  var notes = [
    {text: "First note"},
    {text: "Second note"}
  ];
  res.send(notes);
});
