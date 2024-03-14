const express = require('express');
const config = require("../config");
const router = express.Router();
const oauthCtrl = require("./auth.controller");

router.get('/login', (req, res) => {
 res.redirect(`https://github.com/login/oauth/authorize?client_id=${config.CLIENT_ID}`)
});


router.get('/callback', (req, res) => {
        try {
                oauthCtrl.oauthProcessor(req.query.code, (err, data) => {
                        if(err) {
                                res.status(400).send({err:'Bad request'})
                        } else {
                                res.redirect(`/welcome.html?token=${data}`)
                        }
                })
        } catch (error) {
                res.status(500).send({err:'Unexpected server error', err})
        }     
});

module.exports = router;