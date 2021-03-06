var jwt = require('jwt-simple');
var LOGGED_USERS = require('../server').LOGGED_USERS;
var db = require('../config_db').db;
 
var auth = {
  getLoggedUsers: function() { return LOGGED_USERS; },
  removeUser: function(key) {
    var index = LOGGED_USERS.indexOf(key);
    if (index > -1) {
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

    let successCallback = function(dbUserObj) {
      res.json(genToken(dbUserObj));
    }

    let failCallback = function() {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Credenciales no validas"
      });
      return;
    }

    // Fire a query to your DB and check if the credentials are valid
    auth.validate(username, password, successCallback, failCallback);
  },
 
  validate: function(username, password, success, fail) {
    let successCallback = function(obj) {
      if(LOGGED_USERS.indexOf(obj.username)<0) {
        LOGGED_USERS.push(obj.username);
      }
      success(obj);
    }
    let failCallback = function() {
      fail();
    }
    this.queryUser(username, password, successCallback, failCallback);    
  },

  queryUser: function(username, password, success, fail) {
    var client = db.connect("agenda");
    var queryString = 'SELECT "Nombre", "Apellido" FROM "Usuarios" INNER JOIN sla_usuarios_permisos ON "Usuarios"."Usuarios_Id" = sla_usuarios_permisos.id WHERE "Usuario"=\''+username
      +'\' AND "Password"=\'' + password + '\' AND sla_usuarios_permisos.activo=true limit 1';
    db.query(queryString, client, res => {
        db.disconnect(client)
        if(res == [])
          fail();
        var dbUserObj = {
        name: res.rows[0].Nombre,
        surname: res.rows[0].Apellido,
        role: 'trd',
        pass: password,
        username: username
      };
      if(LOGGED_USERS.indexOf(username)<0) {
        LOGGED_USERS.push(dbUserObj.username);
      }
      success(dbUserObj);
    },e => {
        db.disconnect(client)
        fail();
    })
  },
 
  validateUser: function(username, password, success, fail) {
    if(LOGGED_USERS.indexOf(username)>=0) {
      success();
    } else {
      if (username == '' || password == '')
        fail();
      let successCallback = function(obj){success()};
      auth.validate(username, password, successCallback, fail);
    }
  },
}
 
// private method
function genToken(user) {
  var expires = expiresIn(1); // 1 day
  var token = jwt.encode({
    exp: expires,
    user: user
  }, require('../config/secret')());
 
  return {
    token: token,
    user: {
      name: user.name,
      surname: user.surname
    },
    expires: expires
  };
}
 
function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}
 
module.exports = auth;