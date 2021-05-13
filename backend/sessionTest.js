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

//const mongoose = require('mongoose');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const session = require('express-session');	//세션관리용 미들웨어
const fileStore = require('session-file-store')(session);
 
app.use(session({
  
  secret: '@#@$MYSIGN#@$#$',
  resave: false,
  saveUninitialized: true,
  store: new fileStore({
    path:  require('path').join(require('os').tmpdir(), 'sessions')
 })
}));
  
app.get('/api', (req, res) => {
  var mainPage = fs.readFileSync('./api/views/abc.ejs', 'utf-8');
  var page = ejs.render(mainPage, {
    github_id: 'github_id',
    waka_id: 'waka_id'
  });
  console.log(req.session.id+"들어온곳");
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



app.get('/api/tt', function (req, res, next) {
  
    req.session.user = "userObj";
    req.session.save(function(err) {
      // session saved
      console.log(req.session.id+"<----id/tt에서 입력");
      console.log(req.session.user+"<-----user/tt에서 입력");
      res.redirect('/api/hi')
    })
})

app.get('/api/hi', function (req, res, next) {

    //console.log(req);
    console.log(req.session.id+"--->들어온곳");
    console.log(req.session.user+"->hi");
    
    
    req.session.destroy(function(err) {
     
    })
    res.send("ㅎㅎ삭제됨");
})
module.exports = app