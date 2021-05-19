require("dotenv").config();
const app = require('express')();
const cors = require("cors");
const bodyParser = require("body-parser");

const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

//const fileStore = require('session-file-store')(session);

var path = require('path');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cardsRouter = require('./routes/cards');


app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
  secret: '@#@$MYSIGN#@$#$',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_DB,
    collection: "sessions",
    autoRemove: 'native'
  })
}));


// 2. testDB 세팅
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect('mongodb://localhost:17017/githupHealthDB', {useNewUrlParser: true,useUnifiedTopology: true });

// 3. 연결된 testDB 사용
var db = mongoose.connection;
// 4. 연결 실패
db.on('error', function(){
    console.log('Connection Failed!');
});
// 5. 연결 성공
db.once('open', function() {
    console.log('Connected!');
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);



// var chartview = require('../api/routes/chartview');
// app.get('/api/chart', chartview.renderChart);


module.exports = app