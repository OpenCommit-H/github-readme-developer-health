var express = require('express');
var router = express.Router();
const { fetchGoogleFitGetUrl, getRefreshToken } = require("../src/fetchers/googlefit-fetcher");
const axios = require("axios");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/documents/:id', (req,res) => {
  res.json({id: req.params.id});
});
router.get('/api', async (req, res) => {
  const url = await fetchGoogleFitGetUrl();
  console.log('test')
  if(req.session.refresh_token){
    const refresh_token = req.session.refresh_token;
    req.session.destroy(function(err) {
     
    })
    res.render('abc', {data : url, token: refresh_token});
  }
  else {
      res.render('abc', {data : url, token: ""});
  }
});

router.get('/api/get', (req, res)=>{
  res.send("GET");
});

router.get('/api/googleFit', async (req, res)=>{
  const code = req.query.code;
  const refresh_token = await getRefreshToken(code)
  req.session.refresh_token = refresh_token;
  res.cookie('sessionId', req.session.id)
  
  req.session.save(function(err){
    res.redirect('/api');
  });
});

module.exports = router;
