var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var open_id = mongoose.Schema({
  github_id : 'string',
  access_token : 'string',
  refresh_token : 'string',
  waka_id : 'string',
  api_key: 'string',
});

var Open_id = mongoose.model('open_id', open_id);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/hu', function(req, res, next) {
  res.send('erwrwe with a resource');
});

router.post('/input', function(req,res){

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
 res.send("Registration was successful");
});




router.delete('/delete/:username', function(req, res){

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




router.post('/getInfo/:username', function(req, res){

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

module.exports = router;
