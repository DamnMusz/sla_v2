var db = require('../../config_db').db;
var uppercase = require('../../config_db').db_uppercase;
var TIPO_CENTRO = 0;

exports.findAll = function(req, res) {
    var client = db.connect("agenda");
    var queryString = 'SELECT facturacion_entidad.id as "Id", nombre_fantasia as "Nombre", cuit as "CUIT", razon_social as "Razón Social", '
        +' "Provincias_Nombre" as "Provincia", '
        + ' lugar as "Localidad", direccion_legal_calle as "Calle", direccion_legal_numero as "Número", propio as "Propio",'
        + ' afinidad_tarifaria_id as "Afinidad", tipo_factura as "T.Fact." '
        + ' FROM facturacion_entidad LEFT JOIN "Provincias" ON facturacion_entidad.provincia_legal_id = "Provincias"."Provincias_Id" '
        + ' LEFT JOIN lugares ON facturacion_entidad.localidad_legal_id = lugares.id '
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
    var queryString = 'SELECT facturacion_entidad.id as "Id", nombre_fantasia as "Nombre", cuit as "CUIT", razon_social as "Razón Social", '
        +' provincia_legal_id as "Provincia", localidad_legal_id as "Localidad", direccion_legal_calle as "Calle", direccion_legal_numero as "Número",'
        +' propio as "Propio", afinidad_tarifaria_id as "Afinidad", tipo_factura as "T.Fact." '
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
     +'direccion_legal_numero,propio,afinidad_tarifaria_id,tipo_factura,tipo_entidad'
     +') VALUES($1,$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)'
    const values = []
    values.push(uppercase(req.body.nombre_fantasia));
    values.push(req.body.cuit);
    values.push(uppercase(req.body.razon_social));
    values.push(req.body.provincia.id);
    values.push(req.body.localidad.id);
    values.push(uppercase(req.body.calle));
    values.push(req.body.numero);
    values.push(req.body.propio);
    values.push(req.body.afinidad.id);
    values.push(req.body.tipo_factura?uppercase(req.body.tipo_factura):"A");
    values.push(TIPO_CENTRO);

    client.query(queryString, values, dbRes => {
        db.disconnect(client)
        res.status(200).send();
    },e => {
        db.disconnect(client)
        console.log(err.message);
        res.send(500, err.message);
    })
}

exports.updateCentroFacturacion = function(req, res) {
    console.log('PUT/centro');
    var adds = [];
    adds.push({id:'nombre',value: req.body.nombre_fantasia});
    adds.push({id:'nombre_fantasia',value: req.body.nombre_fantasia});
    adds.push({id:'cuit',value: req.body.cuit});
    adds.push({id:'razon_social',value: req.body.razon_social});
    adds.push({id:'provincia_legal_id',value: req.body.provincia});
    adds.push({id:'localidad_legal_id',value: req.body.localidad});
    adds.push({id:'direccion_legal_calle',value: req.body.calle});
    adds.push({id:'direccion_legal_numero',value: req.body.numero});
    adds.push({id:'propio',value: req.body.propio});
    adds.push({id:'afinidad_tarifaria_id',value: req.body.afinidad});
    adds.push({id:'tipo_factura',value: req.body.tipo_factura});

    if(adds.length == 0)
        res.status(200).send();


    var queryString ='UPDATE facturacion_entidad SET (';

    queryString += adds[0].id+'='+adds[0].value;
    for(var i = 1; i < adds.length; ++i) {
        queryString += ','+adds[i].id+'='+adds[i].value;
    }

    queryString += ') WHERE id ='+req.body.id;

    // faltan las comillas en los strings. Fijarse si no lo hace solo ya.
    console.log(queryString);

    res.status(200).send();

    // var client = db.connect("agenda");

    // client.query(queryString, values, dbRes => {
    //     db.disconnect(client)
    //     res.status(200).send();
    // },e => {
    //     db.disconnect(client)
    //     console.log(err.message);
    //     res.send(500, err.message);
    // })
}