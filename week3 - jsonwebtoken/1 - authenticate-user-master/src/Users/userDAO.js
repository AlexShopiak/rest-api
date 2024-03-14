const users = require('./users.json');
const fs = require('fs');

function findUser(email,done){
    const userFetched = users.filter((u) => u.email === email)[0]
    done(null, userFetched);
}

function registerUser(userData,done){
   users.push(userData);

   fs.writeFileSync('Users/users.json', JSON.stringify(users, null, 2));
   done(null, userData);
}

module.exports = {
    findUser,registerUser
}