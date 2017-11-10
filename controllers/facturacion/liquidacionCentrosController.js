var moment = require('moment');
var nodemailer = require('nodemailer')
var db = require('../../config_db').db;
var uppercase = require('../../config_db').db_uppercase;
var TIPO_CENTRO = 0;

exports.findAll = function(req, res) {
    console.log('GET/liquidacionCentro');
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
    +' \'$\'||round(count(*)*facturacion_tarifa.tarifa_por_inspeccion*0.21+count(*)*facturacion_tarifa.tarifa_por_inspeccion,2) as "Total", '
    +' facturacion_tarifario.mail_enviado as "Mail Enviado" '
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
    +' facturacion_tarifa.tarifa_por_inspeccion, '
    +' facturacion_tarifario.mail_enviado '

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

exports.sendMailCentros = function(req, res) {
    var end_error = function(client, e) {
        db.disconnect(client)
        console.log(e.stack);
        res.status(500).send(e.stack);
    }

    var end_success = function(client) {
        console.log("end_success");
        db.disconnect(client);
        console.log("Mail enviado");
        res.status(200).send("Email enviado");
    }

    var updateMailStatus = function(client, success, error) {
        console.log("updateMailStatus");
        console.log('GET/mailLiquidacionCentro');
        var dPeriodo = moment(req.body.periodo, 'yyyy-MM');
    
        var queryString = 'UPDATE facturacion_tarifario SET mail_enviado = true WHERE id_entidad = $1 '
        + ' AND to_char(facturacion_tarifario.periodo, \'MM/YYYY\') = $2';
        const values = [];
        values.push(req.params.id);
        values.push(dPeriodo.format('MM/YYYY'));
        
        client.query(queryString, values)
        .then(dbRes => {
            success(client);
        })
        .catch(e => {
            error(client, e);
        })
    }
    
    var doSendMail = function(client, html, tabla, success, error) {        
        console.log("doSendMail");
        moment.locale('es');
        var dPeriodo = moment(req.body.periodo, 'yyyy-MM');
        
        var html_table = '<html>'
        
        html_table += '<table cellspacing="0"><tr>';
        var keys = Object.keys(tabla);
        keys.forEach(function(key) {
            html_table += '<th style="border: 1px solid black; background-color:#FFFDE7; padding: 5px; margin: 0;">'+key+'</th>'
        }, this);
        html_table += '</tr><tr>'
        keys.forEach(function(key) {
            html_table += '<td style="border: 1px solid black; padding: 5px; margin: 0;">'+tabla[key]+'</td>'
        }, this);
        html_table += '</tr></table></html>'

        var body = html.replace(/(?:\r\n|\r|\n)/g, '<br />');
        console.log(body);
        body = body.replace(/(?:<<mes>>)/g, dPeriodo.format('MMMM YYYY'));
        body = body.replace(/(?:<<facturacion>>)/g, html_table);
        console.log(body);
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'dmuszalski@tecno-red.com.ar',
                pass: '<the_password>'
            }
        });
            
        var mailOptions = {
            from: 'dmuszalski@tecno-red.com.ar',
            to: 'dmuszalski@tecno-red.com.ar',
            subject: 'Liquidación ' + dPeriodo.format('MMMM YYYY'),
            replyTo: 'fperrone@tecno-red.com.ar',
            cc: 'damianfiuba@gmail.com',
            html: body
        };
            
        console.log("enviando mail");
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                error(error);
            } else {
                console.log("success");
                success(client, end_success, end_error);
            }
        });

    }

    var findMailText = function(client, success, error) {
        console.log("findMailText");
        console.log('GET/mailLiquidacionCentro');
        var dPeriodo = moment(req.body.periodo, 'yyyy-MM');
    
        var queryString = 
         'select facturacion_entidad_email.body, facturacion_entidad.razon_social, '
        +' facturacion_entidad.cuit, facturacion_entidad.nombre, sla.periodo, '
        +' count(*) as qip, \'$\'||facturacion_tarifa.tarifa_por_inspeccion as pip, '
        +' \'$\'||round(count(*)*facturacion_tarifa.tarifa_por_inspeccion,2) as neto, '
        +' \'$\'||round(count(*)*facturacion_tarifa.tarifa_por_inspeccion*0.21,2) as iva, '
        +' \'$\'||round(count(*)*facturacion_tarifa.tarifa_por_inspeccion*0.21+count(*)*facturacion_tarifa.tarifa_por_inspeccion,2) as total '
        +' from facturacion_entidad '
        +' inner join facturacion_entidad_email on facturacion_entidad.id = facturacion_entidad_email.id '
        +' inner join sla on facturacion_entidad.nombre = sla.taller_triki and sla.periodo='+dPeriodo.format('YYYYMM')+' '
        +' inner join facturacion_tarifario on facturacion_entidad.id = facturacion_tarifario.id_entidad and facturacion_tarifario.periodo::date=\''+dPeriodo.format('YYYY-MM-DD')+'\'::timestamp::date '
        +' left join afinidad_tarifaria on facturacion_entidad.afinidad_tarifaria_id = afinidad_tarifaria.id '
        +' inner join facturacion_tarifa on facturacion_tarifario.id_tarifa = facturacion_tarifa.id '
        +' where facturacion_entidad.id = $1 '
        +' group by facturacion_entidad.id, facturacion_entidad.nombre, facturacion_entidad.razon_social, afinidad_tarifaria.descripcion,  facturacion_entidad.cuit,  '
        +' sla.periodo, facturacion_tarifa.tarifa_por_inspeccion, facturacion_tarifario.mail_enviado, facturacion_entidad_email.body '

        const values = [];
        values.push(req.params.id);
        
        client.query(queryString, values)
        .then(dbRes => {
            var tabla = {
                "Razón Social":dbRes.rows[0].razon_social,
                "CUIT":dbRes.rows[0].cuit,
                "Centro":dbRes.rows[0].nombre,
                "Periodo":dbRes.rows[0].periodo,
                "Qip":dbRes.rows[0].qip,
                "$ Ip":dbRes.rows[0].pip,
                "Neto":dbRes.rows[0].neto,
                "IVA":dbRes.rows[0].iva,
                "Total":dbRes.rows[0].total,
            }
            success(client, dbRes.rows[0].body, tabla, updateMailStatus, end_error);
        })
        .catch(e => {
            error(e);
        })
    }

    var sendMail = function() {
        console.log("sendMail");
        var client = db.connect("agenda");
        findMailText(client, doSendMail, end_error);
    }

    var html = '<h1>That was easy!</h1><br/><h2>Cool</h2>';
    sendMail();
};