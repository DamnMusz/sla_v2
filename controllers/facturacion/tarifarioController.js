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
     +'tarifa_por_inspeccion,nombre) VALUES($1,$2) RETURNING *'
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
    dFrom = dFrom.setMonth(dFrom.getMonth() + 1);
    dTo = new Date(to);
    dTo = dTo.setMonth(dTo.getMonth()+1);

    var daysOfYear = [];
    for (var d = new Date(dFrom); d <= dTo; d.setMonth(d.getMonth() + 1)) {
        daysOfYear.push(new Date(d));
    }

    var client = db.connect("agenda");
    db.query(queryString1
        , client, dbRes => {
        db.query(queryString2
            , client, dbRes2 => {
            db.disconnect(client);
            var fill = dbRes2.rows;
            var rows = dbRes.rows;

            rows.forEach(function(r) {
                daysOfYear.forEach(function(element) {
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
    console.log(req.body);
    res.status(200).json();
}

exports.findAllTarifas = function(req, res) {
    console.log('GET/tarifa');
    var client = db.connect("agenda");
    var queryString = 'SELECT nombre as "Nombre Tarifa", \'$\'||tarifa_por_inspeccion as "Monto", to_char(fecha_creacion, \'DD Mon YYYY\') as "Creada" FROM facturacion_tarifa ORDER BY fecha_creacion DESC';
    db.query(queryString
        , client, dbRes => {
        console.log('GET/tarifa');
        db.disconnect(client)
		res.status(200).json(dbRes.rows);
    },e => {
        db.disconnect(client)
        res.status(500).send(e.message);
    })
};