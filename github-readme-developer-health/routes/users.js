const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const open_id = mongoose.Schema(
    {github_id: 'string', access_token: 'string', refresh_token: 'string', waka_id: 'string', api_key: 'string'}
);

const Open_id = mongoose.model('open_id', open_id);

router.post('/input', function (req, res) {

    var newOpen_id = new Open_id(
        {github_id: req.body.github_id, access_token: req.body.access_token, refresh_token: req.body.refresh_token, waka_id: req.body.waka_id, api_key: req.body.api_key}
    );

    Open_id.findOne({
        github_id: req.body.github_id
    }, function (error, open_id) {
        if (error) {} else {
            if (open_id == null) {
                newOpen_id.save();
            } else {
                Open_id.deleteOne({
                    github_id: req.body.github_id
                }, function (err, obj) {
                    if (err) 
                        throw err;
                    }
                );
                newOpen_id.save();
            }
        }
    });
    res.send("Registration was successful");
});

router.post('/getInfo/:username', function (req, res) {

    Open_id.findOne({
        github_id: req.params.username
    }, function (error, open_id) {
        if (error) {
            res.send(error);
        } else {
            if (open_id == null) {
                res.send("user is not found");
            } else {
                res.send(open_id);
            }
        }

    });
});

module.exports = router;
