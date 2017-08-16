var jwt = require('jwt-simple');
var LOGGED_USERS = require('../server').LOGGED_USERS;
 
var auth = {
  getLoggedUsers: function() { return LOGGED_USERS; },
  removeUser: function(key) {
    var index = LOGGED_USERS.indexOf(key);
    if (index > -1) {
      console.log("Sesion expirada: " + key);
      LOGGED_USERS.splice(index, 1);
    }
  },
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
        name: 'Damian Muszalski',
        role: 'trd',
        pass: 'lalala123',
        username: 'test'
    };
    console.log("Logueado: " + username);
    console.log(LOGGED_USERS);
    if(LOGGED_USERS.indexOf(username)<0) {
      LOGGED_USERS.push(dbUserObj.username);
    }
    return dbUserObj;
  },
 
  validateUser: function(username, password) {
    console.log("Está " + username + " entre los usuarios logueados?");
    console.log(LOGGED_USERS);
    if(LOGGED_USERS.indexOf(username)>=0) {
      console.log("Ya está logueado: " + username);
      // spoofing the DB response for simplicity
      var dbUserObj = { // spoofing a userobject from the DB. 
        name: 'Damian Muszalski',
        role: 'trd',
        pass: 'lalala123',
        username: 'test'
      };
      return dbUserObj;
    } else {
      console.log("No está logueado: " + username + ". Procediendo a loguear.");
      if (username == '' || password == '')
        return;
      return auth.validate(username, password);
    }
  },
}
 
// private method
function genToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires,
    user: user
  }, require('../config/secret')());
 
  return {
    token: token,
    expires: expires
  };
}
 
function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}
 
module.exports = auth;