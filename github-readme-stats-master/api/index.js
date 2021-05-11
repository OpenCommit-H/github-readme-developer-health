const app = require('express')();
const { v4 } = require('uuid');
const fs = require('fs');
const ejs = require('ejs');
app.set("view engine", "ejs");
app.set("views", "./api/views");

const cors = require("cors");
const urlParse = require("url-parse");
const queryParse = require("query-string");
const bodyParser = require("body-parser");
const axios = require("axios");

const mongoose = require('mongoose');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/api', (req, res) => {
  var mainPage = fs.readFileSync('./api/views/abc.ejs', 'utf-8');
  var page = ejs.render(mainPage, {
    github_id: 'github_id',
    waka_id: 'waka_id'
  });
  res.send(page);
});

app.get('/api/get', (req, res)=>{
  res.send("GET");
});

app.post('/api/post', function(req,res){
  console.log(req.body);

  //backend 를 별도로 실행해야 합니다.
  axios.post('http://localhost:1234/input_userInfo', {
    github_id: req.body.github_id,
    waka_id: req.body.waka_id,
  })
  
  var mainPage = fs.readFileSync('./api/views/abc.ejs', 'utf-8');
  var page = ejs.render(mainPage, {
    github_id: req.body.github_id,
    waka_id: req.body.waka_id,
  });
  res.send(page);
});


module.exports = app