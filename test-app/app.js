const express = require('express');
const app = express();
const bodyParser = require('body-parser');    // 1
app.use(bodyParser.urlencoded({ extended: true }));    // 2
app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/', (req, res)=>{
  res.render('index');
});
app.get('/get', (req, res)=>{
  res.send("GET");
});
app.post('/post', (req, res)=>{
  res.send("POST");
});
app.listen(3000, ()=>{
  console.log('Connected at 3000');
});