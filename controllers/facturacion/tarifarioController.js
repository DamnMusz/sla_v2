var moment = require('moment');
var db = require('../../config_db').db;
var uppercase = require('../../config_db').db_uppercase;
var TIPO_CENTRO = 0;

exports.addTarifa = function(req, res) {
    console.log('POST/tarifa');

    if(!req.body.monto || !req.body.nombre)
        res.status(500).send();

    var client = db.connect("agenda");
    const queryString =
     'INSERT INTO facturacion_tarifa('
     +'tarifa_por_inspeccion,nombre) VALUES($1,$2)'
    const values = []
    values.push(req.body.monto);
    values.push(uppercase(req.body.nombre));

    client.query(queryString, values, dbRes => {
        db.disconnect(client)
        res.status(200).send(db.rows);
    },e => {
        db.disconnect(client)
        console.log(e.message);
        res.status(500).send(e.message);
    })
}

exports.getTarifario = function(req, res) {
    console.log('GET/tarifario');
    var from = req.query.from;
    var to = req.query.to;
    if (from == undefined || from.length < 6 || to == undefined || to.length < 6)
        res.status(200).send();

    var queryString1 = 'select facturacion_entidad.id as "Id", facturacion_entidad.nombre_fantasia as "Nombre", afinidad_tarifaria.descripcion as "Afinidad" from facturacion_entidad'
    + ' left join afinidad_tarifaria on facturacion_entidad.afinidad_tarifaria_id = afinidad_tarifaria.id';

    var queryString2 = 'select facturacion_entidad.id as "Id", '
    + 'to_char(facturacion_tarifario.periodo, \'MM/YYYY\') as periodo,facturacion_tarifa.tarifa_por_inspeccion from facturacion_entidad '
    + 'left join afinidad_tarifaria on facturacion_entidad.afinidad_tarifaria_id = afinidad_tarifaria.id '
    + 'left join facturacion_tarifario on facturacion_entidad.id = facturacion_tarifario.id_entidad '
    + 'left join facturacion_tarifa on facturacion_tarifario.id_tarifa = facturacion_tarifa.id '
    + 'where periodo IS NULL OR ( periodo >= \''+ from +'\' and periodo <= \''+ to +'\' )'

    dFrom = new Date(from);
    dFrom.setDate(dFrom.getDate()+1);
    dTo = new Date(to);

    var monthsOfYear = [];
    for (var d = new Date(dFrom); d <= dTo; d.setMonth(d.getMonth() + 1)) {
        monthsOfYear.push(new Date(d));
    }

    var client = db.connect("agenda");
    db.query(queryString1
        , client, dbRes => {
        db.query(queryString2
            , client, dbRes2 => {
            db.disconnect(client);
            var rows = dbRes.rows;

            rows.forEach(function(r) {
                monthsOfYear.forEach(function(element) {
                    var date = ("0"+(element.getMonth()+1)).slice(-2)+"/"+element.getFullYear();
                    var value = "";
                    dbRes2.rows.forEach(function(dbRow){
                        if(dbRow.Id == r.Id && dbRow.periodo == date)
                            value = '$'+dbRow.tarifa_por_inspeccion;
                    }, this);
                    r[date] = value;
                }, this);    
            }, this);
            res.status(200).json(rows);
        },e => {
            db.disconnect(client)
            res.status(500).send(e.message);
        })
    },e => {
        db.disconnect(client)
        res.status(500).send(e.message);
    })
};

getAddFields = function(arr) {
    var res = {};    
    res.keys = Object.keys(arr);
    res.keys.splice(res.keys.indexOf("id"),1);
    res.values = [];
    res.keys.forEach(function(key) {
        res.values.push(arr[key]);
    }, this);
    return res;
}

exports.editTarifario = function(req, res) {
    console.log('PUT/tarifario');
    if(!req.body.id || !req.body.desde || !req.body.hasta || !req.body.tarifas)
        res.status(500).send("Datos incompletos");

    dFrom = moment(req.body.desde, 'yyyy-MM');
    dTo = moment(req.body.hasta, 'yyyy-MM');

    var values = [];

    var d = moment(dFrom);
    while (d <= dTo) {
        values.push(moment(d));
        d.add(1,'months');
    }
    var queryString =
     'INSERT INTO facturacion_tarifario ('
     +'id_entidad,id_tarifa,periodo) SELECT '
     + req.body.id+' id_entidad,'+req.body.tarifas+' id_tarifa,periodo FROM unnest(ARRAY[';

    values.forEach(function(element) {
        queryString += "'" + element.toISOString() +"'::timestamp without time zone,"
    }, this);
    queryString = queryString.replace(/,\s*$/, "");
    queryString += ']) periodo';


    var client = db.connect("agenda");
    client.query(queryString, []).then(dbRes => {
        db.disconnect(client);
        res.status(200).send();
    }).catch(e => {
        db.disconnect(client);
        var message = "";
        console.log(queryString);
        console.log(e);
        if(e)
            message = e.message;
        console.log(message);
        res.status(500).send(message);
    })
}

exports.findAllTarifasOptions = function(req,res) {
    console.log('GET/tarifaOptions');
    var client = db.connect("agenda");
    var queryString = 'SELECT id as id, nombre as value FROM facturacion_tarifa ORDER BY fecha_creacion DESC';
    db.query(queryString
        , client, dbRes => {
        db.disconnect(client)
		res.status(200).json(dbRes.rows);
    },e => {
        db.disconnect(client)
        res.status(500).send(e.message);
    })
}

exports.findAllTarifas = function(req, res) {
    console.log('GET/tarifa');
    var client = db.connect("agenda");
    var queryString = 'SELECT nombre as "Nombre Tarifa", \'$\'||tarifa_por_inspeccion as "Monto", to_char(fecha_creacion, \'DD Mon YYYY\') as "Creada" FROM facturacion_tarifa ORDER BY fecha_creacion DESC';
    db.query(queryString
        , client, dbRes => {
        db.disconnect(client)
		res.status(200).json(dbRes.rows);
    },e => {
        db.disconnect(client)
        res.status(500).send(e.message);
    })
};