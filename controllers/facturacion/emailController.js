var moment = require('moment');
var db = require('../../config_db').db;
var uppercase = require('../../config_db').db_uppercase;
var TIPO_CENTRO = require('./centrosFacturacionController').TIPO_CENTRO;

exports.findAll = function(req, res) {
    console.log('GET/emailCentro');    
    var client = db.connect("agenda");
    var queryString = 
      'SELECT facturacion_entidad.id as "Id", facturacion_entidad.nombre as "Nombre", body as "Mensaje" FROM facturacion_entidad_email '
    + ' inner join facturacion_entidad on facturacion_entidad.id = facturacion_entidad_email.id '
    + ' WHERE facturacion_entidad.activo = true ORDER BY facturacion_entidad.nombre ASC';
    db.query(queryString
        , client, dbRes => {
        db.disconnect(client)
		res.status(200).jsonp(dbRes.rows);
    },e => {
        db.disconnect(client)
        res.send(500, err.message);
    })        
}

exports.findById = function(req, res) {
    console.log('GET/emailCentro/'+req.params.id);
    var client = db.connect("agenda");
    var queryString = 
    'SELECT id as "Id", body as "Mensaje" FROM facturacion_entidad_email WHERE id = $1'
    const values = []
    values.push(req.params.id);
    client.query(queryString, values).then(function(dbRes){
        db.disconnect(client)
		res.status(200).jsonp(dbRes.rows);
    }).catch(function(err){
        db.disconnect(client)
        console.log(err.stack);
        res.status(500).send(err.stack);
    })      
}

exports.add = function(req, res) {
    console.log('POST/emailCentro');

    if(!req.body.texto || (req.body.id==undefined))
        res.status(500).send("Parámetros incorrectos");

        console.log(req.body);

    var client = db.connect("agenda");
    const queryString =
     'INSERT INTO facturacion_entidad_email('
     +'id,body) VALUES($1,$2)'
    const values = []
    values.push(req.body.id);
    values.push(req.body.texto);

    client.query(queryString, values).then(function(){
        db.disconnect(client)
		res.status(200).send();
    }).catch(function(err){
        db.disconnect(client)
        console.log(err.stack);
        res.status(500).send(err.stack);
    })   
}

exports.edit = function(req, res) {
    console.log('PUT/emailCentro/');

    if(!req.body.texto || (req.body.id==undefined))
        res.status(500).send("Parámetros incorrectos");

    console.log(req.body);

    var client = db.connect("agenda");
    const queryString =
    'UPDATE facturacion_entidad_email SET body = $2 WHERE id = $1'
    const values = []
    values.push(req.body.id);
    values.push(req.body.texto);

    client.query(queryString, values).then(function(){
        db.disconnect(client)
        res.status(200).send();
    }).catch(function(err){
        db.disconnect(client)
        console.log(err.stack);
        res.status(500).send(err.stack);
    })
}

exports.findCentrosWithoutEmail = function(req, res) {
    var client = db.connect("agenda");
    var queryString = 
     'SELECT id as id, nombre as value FROM facturacion_entidad '
    +'WHERE facturacion_entidad.activo = true AND tipo_entidad = ' + TIPO_CENTRO +' AND email IS NOT NULL AND facturacion_entidad.id NOT IN (SELECT DISTINCT id FROM facturacion_entidad_email) ORDER BY nombre ASC';
    client.query(queryString).then(function(dbRes) {
        db.disconnect(client)
        res.status(200).jsonp(dbRes.rows);
    }).catch(function(e){
        db.disconnect(client)
        console.log(e.stack)
        res.status(500).send(e.stack);
    });
};