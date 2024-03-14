const express = require('express');
const router = express.Router();
const userController = require('./userController.js')

router.get('/',(req,res)=>{
	try {
		const userData = req;
		if(!userData.email) {
			return res.status(500).send('User email not availible')
		}
		userController.findUser(userData.email,(err,result)=>{
			if(err) {
				return res.status(400).send('error geting the user', err);
			}
			return res.status(200).send(result);
		})
	} catch (error) {
		return res.status(500).send({error: "unexpected error try afterf sometime", err});
	}
})


module.exports = router