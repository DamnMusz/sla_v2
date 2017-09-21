var db = require('../config_db').db;
var uppercase = require('../config_db').db_uppercase;
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
}

exports.add = function(req, res) {
    console.log('POST/afinidadTarifaria');

    if(!req.body.nombre)
        res.status(500).send();

    var client = db.connect("agenda");
    const queryString =
     'INSERT INTO afinidad_tarifaria('
     +'descripcion,activa) VALUES($1,$2)'
    const values = []
    values.push(uppercase(req.body.nombre));
    values.push(true);

    client.query(queryString, values, dbRes => {
        db.disconnect(client)
        res.status(200).send(db.rows);
    },e => {
        db.disconnect(client)
        console.log(e.message);
        res.status(500).send(e.message);
    })
}

exports.edit = function(req, res) {
    console.log('PUT/afinidadTarifaria');

    if(!req.body.id || !req.body.nombre)
        res.status(500).send();

    var client = db.connect("agenda");
    const queryString =
     'UPDATE afinidad_tarifaria SET descripcion = $1 WHERE id = $2'
    const values = []
    values.push(uppercase(req.body.nombre));
    values.push(req.body.id);

    client.query(queryString, values, dbRes => {
        db.disconnect(client)
        res.status(200).send(db.rows);
    },e => {
        db.disconnect(client)
        console.log(e.message);
        res.status(500).send(e.message);
    })
}