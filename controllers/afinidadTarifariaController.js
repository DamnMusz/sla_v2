var db = require('../config_db').db;
var TIPO_CENTRO = 0;

exports.findAll = function(req, res) {
    console.log('GET/afinidadTarifaria');    
    var client = db.connect("agenda");
    var queryString = 'SELECT id as id, descripcion as value FROM afinidad_tarifaria WHERE activa = true ORDER BY descripcion ASC';
    db.query(queryString
        , client, dbRes => {
        db.disconnect(client)
		res.status(200).jsonp(dbRes.rows);
    },e => {
        db.disconnect(client)
        res.send(500, err.message);
    })        
};