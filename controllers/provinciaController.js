var db = require('../config_db').db;
var TIPO_CENTRO = 0;

exports.findAll = function(req, res) {
    var client = db.connect("agenda");
    var queryString = 'SELECT "Provincias_Id" as id, "Provincias_Nombre" as value FROM "Provincias" ORDER BY "Provincias_Nombre" ASC';
    db.query(queryString
        , client, dbRes => {
        console.log('GET/provincia');
		res.status(200).jsonp(dbRes.rows);
    },e => {
        db.disconnect(client)
        res.send(500, err.message);
    })        
};