const express = require('express');
const router = express.Router();
const authController = require('./authController.js')

router.post('/register',(req,res)=>{
	try {
		const {name, email, password} = req.body;
		if(!(name, email, password)) {
			return res.status(400).send('Requiring inputs are missing');
		}
		const userDetails = { name, email, password };
		authController.registerUser(userDetails, (err, result) => {
			if(err) {
				return res.status(400).send({error:'User already exist'});
			}
			return res.status(201).send({STATUS:"OK", data: result});
		})
	} catch (err) {
		return res.status(500).send({error:'Unexpectede error while reading'});
	}
})

router.post('/login',(req,res)=>{
	try {
		const {email, password} = req.body;
		if(!(email && password)) {
			return res.status(400).send('Requiring inputs are missing')
		}
		
		authController.loginUser({email,password},(err,result)=>{
			if(err) {
				return res.status(400).send({error:'Invalid creditentials', err})
			}
			return res.status(200).send({STATUS:"OK", data: result})
        })
	} catch (error) {
		return res.status(401).send(error)
	}
})

module.exports = router