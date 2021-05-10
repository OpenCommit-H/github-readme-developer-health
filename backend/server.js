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



 

  


// 10. Student 레퍼런스 전체 데이터 가져오기


// // 11. 특정 아이디값 가져오기
// Open_id.findOne({github_id:'111'}, function(error,open_id){
//     console.log('--- Read one ---');
//     if(error){
//         console.log(error);
//     }else{
//         console.log(open_id);
//     }
// });

// 12. 특정아이디 수정하기
// Student.findById({_id:'585b777f7e2315063457e4ac'}, function(error,student){
//     console.log('--- Update(PUT) ---');
//     if(error){
//         console.log(error);
//     }else{
//         student.name = '--modified--';
//         student.save(function(error,modified_student){
//             if(error){
//                 console.log(error);
//             }else{
//                 console.log(modified_student);
//             }
//         });
//     }
// });

// // 13. 삭제
// Open_id.remove({github_id:'pyoki32'}, function(error,output){
//     console.log('--- Delete ---');
//     if(error){
//         console.log(error);
//     }

//     /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
//         어떤 과정을 반복적으로 수행 하여도 결과가 동일하다. 삭제한 데이터를 다시 삭제하더라도, 존재하지 않는 데이터를 제거요청 하더라도 오류가 아니기 때문에
//         이부분에 대한 처리는 필요없다. 그냥 삭제 된것으로 처리
//         */
//     console.log('--- deleted ---');
// });
// Open_id.remove({github_id:'pyoki32'}, function(error,output){
//     console.log('--- Delete ---');
//     if(error){
//         console.log(error);
//     }

//     /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
//         어떤 과정을 반복적으로 수행 하여도 결과가 동일하다. 삭제한 데이터를 다시 삭제하더라도, 존재하지 않는 데이터를 제거요청 하더라도 오류가 아니기 때문에
//         이부분에 대한 처리는 필요없다. 그냥 삭제 된것으로 처리
//         */
//     console.log('--- deleted ---');
// });
// Open_id.remove({github_id:'pyoki32'}, function(error,output){
//     console.log('--- Delete ---');
//     if(error){
//         console.log(error);
//     }

//     /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
//         어떤 과정을 반복적으로 수행 하여도 결과가 동일하다. 삭제한 데이터를 다시 삭제하더라도, 존재하지 않는 데이터를 제거요청 하더라도 오류가 아니기 때문에
//         이부분에 대한 처리는 필요없다. 그냥 삭제 된것으로 처리
//         */
//     console.log('--- deleted ---');
// });




app.listen(port, () => console.log(`Google Fit it listening on port ${port}`));
