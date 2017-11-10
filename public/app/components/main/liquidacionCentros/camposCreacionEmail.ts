import {URL_NOMBRES_CENTROS_FACTURACION_WITHOUT_EMAIL} from '../../rutas';
export var creacionEmail = {
    types: {
        id: {
            type: 'select',
            url_get: URL_NOMBRES_CENTROS_FACTURACION_WITHOUT_EMAIL
        },   
        texto: 'textarea'
    },
    text: {
        id: 'Centro',
        texto: 'Cuerpo del mensaje'
    },
    info: 'Utilice <<mes>> para reemplazar por el mes actual, y <<facturacion>> para reemplazar por la tabla de facturación.'
}