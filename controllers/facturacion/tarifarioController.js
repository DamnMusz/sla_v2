var db = require('../../config_db').db;
var TIPO_CENTRO = 0;

exports.createTarifa = function(req, res) {
    console.log('POST/tarifa');
    console.log(req.body);
    res.status(200).send();   
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
        {'Tarifas': 'Tarifa1'},
        {'Tarifas': 'Tarifa2'},
        {'Tarifas': 'Tarifa3'},
        {'Tarifas': 'Tarifa4'},
        {'Tarifas': 'Tarifa5'},
    ]
    res.status(200).jsonp(result);
};