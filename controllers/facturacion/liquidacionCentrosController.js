var moment = require('moment');
var db = require('../../config_db').db;
var uppercase = require('../../config_db').db_uppercase;
var TIPO_CENTRO = 0;

exports.findAll = function(req, res) {
    console.log('GET/liquidacionCentro');
    // var client = db.connect("agenda");
    // var queryString = 'SELECT nombre as "Nombre Tarifa", \'$\'||tarifa_por_inspeccion as "Monto", to_char(fecha_creacion, \'DD Mon YYYY\') as "Creada" FROM facturacion_tarifa ORDER BY fecha_creacion DESC';
    // db.query(queryString
    //     , client, dbRes => {
    //     db.disconnect(client)
	// 	res.status(200).json(dbRes.rows);
    // },e => {
    //     db.disconnect(client)
    //     res.status(500).send(e.message);
    // })
    console.log(req.query.periodo);
    var dPeriodo = moment(req.query.periodo, 'yyyy-MM');
    console.log(dPeriodo.format('YYYYMM'));

    var queryString = 
     'select facturacion_entidad.id as "Id", '
     +'facturacion_entidad.nombre as "Centro", '
     +'facturacion_entidad.razon_social as "Razón Social", '
     +'afinidad_tarifaria.descripcion as "Afinidad", '
     +'facturacion_entidad.cuit as "CUIT", '
     +'sla.periodo as "Periodo", '
     +'\'$\'||facturacion_tarifa.tarifa_por_inspeccion as "Tarifa", '
     +'count(*) as "Qip", '
     +'\'$\'||round(count(*)*facturacion_tarifa.tarifa_por_inspeccion,2) as "Neto", '
    +' \'$\'||round(count(*)*facturacion_tarifa.tarifa_por_inspeccion*0.21,2) as "IVA", '
    +' \'$\'||round(count(*)*facturacion_tarifa.tarifa_por_inspeccion*0.21+count(*)*facturacion_tarifa.tarifa_por_inspeccion,2) as "Total" '
    +' from facturacion_entidad '
    +' inner join sla on facturacion_entidad.nombre = sla.taller_triki and sla.periodo='+dPeriodo.format('YYYYMM')+' '
    +' inner join facturacion_tarifario on facturacion_entidad.id = facturacion_tarifario.id_entidad and facturacion_tarifario.periodo::date=\''+dPeriodo.format('YYYY-MM-DD')+'\'::timestamp::date '
    +' left join afinidad_tarifaria on facturacion_entidad.afinidad_tarifaria_id = afinidad_tarifaria.id '
    +' inner join facturacion_tarifa on facturacion_tarifario.id_tarifa = facturacion_tarifa.id '
    +' group by facturacion_entidad.id, '
    +' facturacion_entidad.nombre, '
    +' facturacion_entidad.razon_social, '
    +' afinidad_tarifaria.descripcion, '
    +' facturacion_entidad.cuit, '
    +' sla.periodo, '
    +' facturacion_tarifa.tarifa_por_inspeccion '

    var client = db.connect("agenda");
    db.query(queryString
        , client, dbRes => {
        db.disconnect(client)
		res.status(200).json(dbRes.rows);
    },e => {
        db.disconnect(client)
        console.log(queryString);
        res.status(500).send(e.message);
    })
};