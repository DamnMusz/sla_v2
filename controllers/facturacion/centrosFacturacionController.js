var db = require('../../config_db').db;
var uppercase = require('../../config_db').db_uppercase;
var TIPO_CENTRO = 0;

exports.findAll = function(req, res) {
    var client = db.connect("agenda");
    var queryString = 'SELECT facturacion_entidad.id as "Id", nombre as "Nombre", cuit as "CUIT", razon_social as "Razón Social", '
        + ' "Provincias_Nombre" as "Provincia", '
        + ' lugar as "Localidad", direccion_legal_calle as "Calle", direccion_legal_numero as "Número", propio as "Propio",'
        + ' afinidad_tarifaria.descripcion as "Afinidad", tipo_factura as "T.Fact." '
        + ' FROM facturacion_entidad LEFT JOIN "Provincias" ON facturacion_entidad.provincia_legal_id = "Provincias"."Provincias_Id" '
        + ' LEFT JOIN lugares ON facturacion_entidad.localidad_legal_id = lugares.id '
        + ' LEFT JOIN afinidad_tarifaria ON facturacion_entidad.afinidad_tarifaria_id = afinidad_tarifaria.id '
        + ' WHERE facturacion_entidad.activo = true AND tipo_entidad = ' + TIPO_CENTRO
        + ' LIMIT 100 ';
    db.query(queryString
        , client, dbRes => {
        console.log('GET/centro');
        db.disconnect(client)
		res.status(200).jsonp(dbRes.rows);
    },e => {
        db.disconnect(client)
        res.send(500, err.message);
    })        
};

exports.findById = function(req, res) {
    var client = db.connect("agenda");
    var queryString = 'SELECT facturacion_entidad.id as "Id", nombre as "Nombre", cuit as "CUIT", razon_social as "Razón Social", '
        +' provincia_legal_id as "Provincia", localidad_legal_id as "Localidad", direccion_legal_calle as "Calle", direccion_legal_numero as "Número",'
        +' propio as "Propio", afinidad_tarifaria_id as "Afinidad", tipo_factura as "T.Fact.", email as "Email" '
        + ' FROM facturacion_entidad WHERE id = ' + req.params.id;
    db.query(queryString
        , client, dbRes => {
        console.log('GET/centro/'+req.params.id);
        db.disconnect(client)
		res.status(200).jsonp(dbRes.rows);
    },e => {
        db.disconnect(client)
        res.send(500, err.message);
    })      
}

exports.addCentroFacturacion = function(req, res) {
    console.log('POST/centro');
    var client = db.connect("agenda");
    const queryString =
     'INSERT INTO facturacion_entidad('
     +'nombre, nombre_fantasia,cuit,razon_social,provincia_legal_id,localidad_legal_id,direccion_legal_calle,'
     +'direccion_legal_numero,propio,afinidad_tarifaria_id,tipo_factura,tipo_entidad,email'
     +') VALUES($1,$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)'
    const values = []
    console.log(req.body);
    values.push(uppercase(req.body.nombre));
    values.push(req.body.cuit);
    values.push(uppercase(req.body.razon_social));
    values.push(req.body.provincia_legal_id);
    values.push(req.body.localidad_legal_id);
    values.push(uppercase(req.body.calle));
    values.push(req.body.numero);
    values.push(req.body.propio?req.body.propio:false);
    values.push(req.body.afinidad_tarifaria_id);
    values.push(req.body.tipo_factura?uppercase(req.body.tipo_factura):"A");
    values.push(TIPO_CENTRO);
    values.push(uppercase(req.body.email));

    client.query(queryString, values, dbRes => {
        db.disconnect(client)
        res.status(200).send();
    },e => {
        db.disconnect(client)
        console.log(err.message);
        res.send(500, err.message);
    })
}

getAddFields = function(arr) {
    var res = {};    
    res.keys = Object.keys(arr);
    res.keys.splice(res.keys.indexOf("id"),1);
    res.keys.splice(res.keys.indexOf("Id"),1);
    res.values = [];
    res.keys.forEach(function(key) {
        res.values.push(uppercase(arr[key]));
    }, this);
    return res;
}

// TODO: Parametrizar el ID también para evitar SQL Injection
exports.updateCentroFacturacion = function(req, res) {
    console.log('PUT/centro');
    getAddFields(req.body);
    var adds = getAddFields(req.body);

    if(adds.length == 0)
        res.status(200).send();

    var queryString ='UPDATE facturacion_entidad SET (';

    queryString += adds.keys[0];
    for(var i = 1; i < adds.keys.length; ++i) {
        queryString += ','+adds.keys[i];
    }
    queryString += ') = ($1';
    for(var i = 1; i < adds.keys.length; ++i) {
        queryString += ','+'$'+(i+1);
    }

    queryString += ') WHERE id = '+req.body.id;

    var client = db.connect("agenda");

    client.query(queryString, adds.values, dbRes => {
        db.disconnect(client)
        res.status(200).send();
    },e => {
        db.disconnect(client)
        console.log(err.message);
        res.send(500, err.message);
    })
    res.status(200).send();
}