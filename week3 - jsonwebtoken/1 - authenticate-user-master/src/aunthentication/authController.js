const userService = require('../Users/userService.js');
const authService = require('./authService.js');

function registerUser(userData,done){
    userService.findUser(userData.email, (err, userFound) => {
		if (err) {
			done(err);
		} else {
			if (userFound) {
				done(userFound);
			} else {
				userService.registerUser(userData, done);
			}
		}
    });
}

function loginUser({ email, password }, done) {
	
	userService.findUser(email, (err, userFound) => {
		if (err) {
			done(err);
		} else {
			
			const userVerified = authService.verifyUser({email, password}, userFound);
			if (userFound) {
				const jwtToken = authService.createJWT(userFound);
				done(null, jwtToken);
				
			} else {
				done({error:'User not verified'})
			}
		}
	})
}

module.exports = {
    registerUser,loginUser
}