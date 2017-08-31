var db = require('../config_db').db;
var TIPO_CENTRO = 0;

exports.findAll = function(req, res) {
    var client = db.connect("agenda");
    var queryString = 'SELECT id as id, descripcion as value FROM afinidad_tarifaria WHERE activa = true ORDER BY descripcion ASC';
    db.query(queryString
        , client, dbRes => {
        console.log('GET/afinidadTarifaria');
        db.disconnect(client)
		res.status(200).jsonp(dbRes.rows);
    },e => {
        db.disconnect(client)
        res.send(500, err.message);
    })        
};