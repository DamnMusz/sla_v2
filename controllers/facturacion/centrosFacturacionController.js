var db = require('../../config_db').db;
var TIPO_CENTRO = 0;

exports.findAll = function(req, res) {
    var client = db.connect("agenda");
    var queryString = 'SELECT facturacion_entidad.id as "Id", nombre_fantasia as "Nombre", cuit as "CUIT", razon_social as "Razón Social", "Provincias_Nombre" as "Provincia", '
        + ' lugar as "Localidad", direccion_legal_calle as "Calle", direccion_legal_numero as "Número", propio as "Propio", afinidad_tarifaria_id as "Afinidad", tipo_factura as "T.Fact." '
        + ' FROM facturacion_entidad INNER JOIN "Provincias" ON facturacion_entidad.provincia_legal_id = "Provincias"."Provincias_Id" '
        + ' INNER JOIN lugares ON facturacion_entidad.localidad_legal_id = lugares.id '
        + ' WHERE facturacion_entidad.activo = true AND tipo_entidad = ' + TIPO_CENTRO
        + ' LIMIT 100 ';
    db.query(queryString
        , client, dbRes => {
        console.log('GET/centros');
        db.disconnect(client)
		res.status(200).jsonp(dbRes.rows);
    },e => {
        db.disconnect(client)
        res.send(500, err.message);
    })        
};