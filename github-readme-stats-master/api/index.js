const app = require('express')()
const { v4 } = require('uuid')
app.set("view engine", "ejs");
app.set("views", "C:/Users/multicampus/Desktop/ssafy/testnode/api/views");
app.get('/api', (req, res)=>{
  res.render('abc');
});
app.get('/api/get', (req, res)=>{
  res.send("GET");
});
app.post('/api/post', (req, res)=>{
  res.send("POST");
});

module.exports = app