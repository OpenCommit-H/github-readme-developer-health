// 1. mongoose 모듈 가져오기
const express = require("express")
const port = 1234;
const cors = require("cors");
const app = express();
const urlParse = require("url-parse");
const queryParse = require("query-string");
const bodyParser = require("body-parser");
const axios = require("axios");

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var mongoose = require('mongoose');
// 2. testDB 세팅
mongoose.connect('mongodb://localhost:17017/ssafyDB', {useNewUrlParser: true,useUnifiedTopology: true });

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

var open_id = mongoose.Schema({
    github_id : 'string',
    access_token : 'string',
    refresh_token : 'string',
    waka_id : 'string',
    api_key: 'string',
});

var Open_id = mongoose.model('open_id', open_id);

app.post('/input_userInfo', function(req,res){

     var newOpen_id = new Open_id({ github_id : req.body.github_id,
                                    access_token:req.body.access_token,
                                    refresh_token :  req.body.refresh_token,
                                    waka_id : req.body.waka_id,
                                    api_key: req.body.api_key,});
    
    
   Open_id.findOne({github_id:req.body.github_id}, function(error,open_id){
    if(error){
        console.log(error);
    }else{
        if(open_id==null){
            console.log("new saved");
            newOpen_id.save();
        }else{
            Open_id.findOne({github_id:req.body.github_id}, function(error,open_id){
                console.log('--- Update(PUT) ---');
                if(error){
                    console.log(error);
                }else{
                    open_id.access_token = req.body.access_token;
                    open_id.refresh_token = req.body.refresh_token;
                    open_id.waka_id =  req.body.waka_id;
                    open_id.api_key=req.body.api_key;
                    newOpen_id.save();
                }
            });

        }
        }
    }); 
    res.send("뿅");
  });



 
app.delete('/deleteUser/:username', function(req, res){

    Open_id.findOne({github_id:req.params.username}, function(error,open_id){
        if(error){
            console.log(error);
        }else{
            if(open_id==null){
             console.log("유저 없음");
            }
            else{
                console.log('--- Delete ---');
                Open_id.remove({github_id:req.params.username});
            }
        }
    
    }); 
    res.send("뿅");
});
  



app.post('/getUserInfo/:username', function(req, res){

    Open_id.findOne({github_id:req.params.username}, function(error,open_id){
        if(error){
            console.log(error);
            res.send(error);
        }else{
            if(open_id==null){
                console.log("유저 없음");
                res.send("유저없음");
            }
            else{
                console.log(open_id);
                res.send(open_id);
            }
        }
    
    }); 
});


app.listen(port, () => console.log(`Google Fit it listening on port ${port}`));
