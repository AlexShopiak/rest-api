const userService = require('./userService.js')


function findUser(email,done){
    userService.findUser(email, done);  
}

module.exports = {
    findUser
}