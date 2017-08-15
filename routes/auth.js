var jwt = require('jwt-simple');
var loggedUsers = require('../server').loggedUsers;
 
var auth = { 
  login: function(req, res) {

    var username = req.body.username || '';
    var password = req.body.password || '';
 
    if (username == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Credenciales no validas"
      });
      return;
    }
 
    // Fire a query to your DB and check if the credentials are valid
    var dbUserObj = auth.validate(username, password);
   
    if (!dbUserObj) { // If authentication fails, we send a 401 back
      res.status(401);
      res.json({
        "status": 401,
        "message": "Credenciales no validas"
      });
      return;
    }
 
    if (dbUserObj) {
      // If authentication is success, we will generate a token
      // and dispatch it to the client
      res.json(genToken(dbUserObj));
    }
 
  },
 
  validate: function(username, password) {
    if(username != 'test')
      return;
    // spoofing the DB response for simplicity
    var dbUserObj = { // spoofing a userobject from the DB. 
      name: 'Damián',
      role: 'admin',
      username: 'dmuszalski@tecno-red.com.ar'
    };
    console.log("Logueado: " + username);
    console.log(loggedUsers);
    loggedUsers.push(dbUserObj.username);
    return dbUserObj;
  },
 
  validateUser: function(username) {
    if(!loggedUsers)
    {
      loggedUsers = [];
      console.log("Reiniciados los logged users");
    }
    console.log("Está " + username + " entre los usuarios logueados?");
    console.log(loggedUsers);
    if(loggedUsers.indexOf(username)>=0) {
      console.log("Ya está logueado: " + username);
      // spoofing the DB response for simplicity
      var dbUserObj = { // spoofing a userobject from the DB. 
        name: 'Damián',
        role: 'admin',
        username: 'dmuszalski@tecno-red.com.ar'
      };
      return dbUserObj;
    } else {
      console.log("No está logueado: " + username);
      return;
    }
  },
}
 
// private method
function genToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires
  }, require('../config/secret')());
 
  return {
    token: token,
    expires: expires,
    user: user
  };
}
 
function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}
 
module.exports = auth;