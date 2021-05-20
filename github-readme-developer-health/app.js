require("dotenv").config();
const app = require('express')();
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const path = require('path');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create(
        {mongoUrl: process.env.MONGO_DB, collection: "sessions", autoRemove: 'native'}
    )
}));

// 1. DB connect
mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// 2. Get DB instance
var db = mongoose.connection;
// 3. connect failed
db.on('error', function () {
    console.log('Connection Failed!');
});
// 4. connect success
db.once('open', function () {
    console.log('Connected!');
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

module.exports = app