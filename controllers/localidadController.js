var db = require('../config_db').db;
var TIPO_CENTRO = 0;

exports.findAll = function(req, res) {
    console.log('GET/localidad');
    var client = db.connect("agenda");
    var queryString = 'SELECT id as id, lugar as value FROM lugares WHERE cod_provincia = '+req.query.provincia_legal_id+' ORDER BY lugar ASC';
    db.query(queryString
        , client, dbRes => {
        db.disconnect(client);
		res.status(200).jsonp(dbRes.rows);
    },e => {
        db.disconnect(client)
        res.send(500, err.message);
    })        
};