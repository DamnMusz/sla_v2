var db = require('../../config_db').db;
var uppercase = require('../../config_db').db_uppercase;
var TIPO_CENTRO = 0;

exports.addTarifa = function(req, res) {
    console.log('POST/tarifa');
    console.log(req.body);

    if(!req.body.monto || !req.body.nombre)
        res.send(500);

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
        console.log(err.message);
        res.send(500, err.message);
    })
}

exports.getTarifario = function(req, res) {
    console.log('GET/tarifario');
    // var client = db.connect("agenda");
    // var queryString = 'SELECT "Provincias_Id" as id, "Provincias_Nombre" as value FROM "Provincias" ORDER BY "Provincias_Nombre" ASC';
    // db.query(queryString
    //     , client, dbRes => {
    //     console.log('GET/provincia');
    //     db.disconnect(client)
	// 	res.status(200).json(dbRes.rows);
    // },e => {
    //     db.disconnect(client)
    //     res.send(500, err.message);
    // })
    var result = [
        {
            centro: 'Adrogué',
            afinidad: 'Sorensen',
            '01/2016': '$50',
            '02/2016': '$50',
            '03/2016': '$50',
            '04/2016': '$50',
            '05/2016': '$50',
            '06/2016': '$50',
            '07/2016': '$60',
            '08/2016': '$60',
            '09/2016': '$60',
            '10/2016': '$60',
            '11/2016': '$60',
            '12/2016': '$60',
        },
        {
            centro: 'Lanús',
            afinidad: 'Milla',
            '01/2016': '$60',
            '02/2016': '$60',
            '03/2016': '$60',
            '04/2016': '$60',
            '05/2016': '$60',
            '06/2016': '$60',
            '07/2016': '$80',
            '08/2016': '$80',
            '09/2016': '$80',
            '10/2016': '$80',
            '11/2016': '$80',
            '12/2016': '$80',
        },
        {
            id: '1',
            centro: 'Moreno',
            afinidad: 'Sorensen',
            '01/2016': '$50',
            '02/2016': '$50',
            '03/2016': '$50',
            '04/2016': '$50',
            '05/2016': '$50',
            '06/2016': '$50',
            '07/2016': '$60',
            '08/2016': '$60',
            '09/2016': '$60',
            '10/2016': '$60',
            '11/2016': '$60',
            '12/2016': '$60',
        }
    ];
    res.status(200).jsonp(result);
};

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
        res.send(500, err.message);
    })
};