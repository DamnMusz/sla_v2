var db = require('../config_db').db;

exports.findAll = function(req, res) {
    var client = db.connect("agenda");
    db.query('SELECT * FROM sla limit 100', client, dbRes => {
        var centros = [
            {Nombre: "nombre1", Direccion: "direccion1", Activo: true, OtroCampo: true},
            {Nombre: "nombre2", Direccion: "direccion2", Activo: false, OtroCampo: true}
        ];
		console.log('GET/centros');
		res.status(200).jsonp(centros);
    },e => {
        db.disconnect(client)
        res.send(500, err.message);
    })        
};