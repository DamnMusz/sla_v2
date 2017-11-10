var jwt = require('jwt-simple');
var validateUser = require('../routes/auth').validateUser;
var removeUser = require('../routes/auth').removeUser;
var getLoggedUsers = require('../routes/auth').getLoggedUsers;
var debugMode = false;

module.exports = function(req, res, next) {
  if (req.query.k!='key') {
    res.redirect('/carga/no_autorizado.html');
  } else {
    next();
  }
};