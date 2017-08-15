var jwt = require('jwt-simple');
var validateUser = require('../routes/auth').validateUser;
var loggedUsers = require('../server').loggedUsers;
 
module.exports = function(req, res, next) {
  function getCookie(cname, cookie) {
    var name = cname + "=";
    var ca = cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
  };

  // When performing a cross domain request, you will recieve
  // a preflighted request first. This is to check if our the app
  // is safe. 
 
  // We skip the token outh for [OPTIONS] requests.
  //if(req.method == 'OPTIONS') next();
 
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];

  if(!token && !key) {
    token = getCookie("access_token",req.headers['cookie']);
    key = getCookie("key",req.headers['cookie']);
  }

  console.log(token);
  console.log(key);
  console.log(loggedUsers);
 
  if (token || key) {
    try {
      var decoded = jwt.decode(token, require('../config/secret.js')());
 
      if (decoded.exp <= Date.now()) {
        var index = loggedUsers.indexOf(key);
        if (index > -1) {
          console.log("Sesion expirada: " + key);
          array.splice(index, 1);
        }
        res.redirect('/');
        // res.status(400);
        // res.json({
        //   "status": 400,
        //   "message": "Sesion expirada"
        // });
        return;
      } else { console.log("Sesion valida: " + key); }
 
      // Authorize the user to see if s/he can access our resources
      var dbUser = validateUser(key); // The key would be the logged in user's username
      if (dbUser) { 
        if ((req.url.indexOf('admin') >= 0 && dbUser.role == 'admin') || (req.url.indexOf('admin') < 0 && req.url.indexOf('/api/v1/') >= 0)) {
          next(); // To move to next middleware
        } else {
          res.redirect('/');
          // res.status(403);
          // res.json({
          //   "status": 403,
          //   "message": "Usuario no autorizado"
          // });
          return;
        }
      } else {
        // No user with this name exists, respond back with a 401
        res.redirect('/');
        // res.status(401);
        // res.json({
        //   "status": 401,
        //   "message": "Usuario no valido"
        // });
        return;
      }
 
    } catch (err) {
      res.status(500);
      res.json({
        "status": 500,
        "message": "Oops algo salio mal",
        "error": err
      });
    }
  } else {
    // res.status(401);
    // res.json({
    //   "status": 401,
    //   "message": "Token o clave invalida"
    // });
    res.redirect('/');
    return;
  }
};