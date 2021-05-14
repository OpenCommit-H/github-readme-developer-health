const app = require('express')();
const { v4 } = require('uuid');
const { fetchGoogleFitGetUrl, getRefreshToken } = require("../src/fetchers/googlefit-fetcher");
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

const session = require('express-session');
const fileStore = require('session-file-store')(session);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
  secret: '@#@$MYSIGN#@$#$',
  resave: false,
  saveUninitialized: true,
  store: new fileStore()
}));

app.get('/api', async (req, res) => {
  const url = await fetchGoogleFitGetUrl();
 
  if(req.session.refresh_token){
    const refresh_token = req.session.refresh_token;
    req.session.destroy(function(){ 
      req.session;
    });      
    res.render('abc', {data : url, token: refresh_token});
  }
  else {
      res.render('abc', {data : url, token: ""});
  }
});

app.get('/api/get', (req, res)=>{
  res.send("GET");
});

app.post('/api/post', async (req,res) => {
  console.log(req.body);
  const url = await fetchGoogleFitGetUrl();
  //backend 를 별도로 실행해야 합니다.
  axios.post('http://localhost:1234/input_userInfo', {
    github_id: req.body.github_id,
    waka_id: req.body.waka_id,
    api_key: req.body.api_key,
    refresh_token : req.body.refresh_token
  })
  
  console.log('등록 완료')
  res.render('abc', {data : url, token: ""});
});

app.get('/api/googleFit', async (req, res)=>{
  const code = req.query.code;
  const refresh_token = await getRefreshToken(code)
  req.session.refresh_token = refresh_token;
  res.cookie('sessionId', req.session.id)
  
  req.session.save(function(err){
    res.redirect('/api');
  });
});

module.exports = app