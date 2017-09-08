import {URL_PROVINCIA} from '../../rutas';
import {URL_LOCALIDAD} from '../../rutas';
import {URL_AFINIDAD_TARIFARIA} from '../../rutas';
export var edicionCentro = {
    types: {
        nombre_fantasia: 'text',
        cuit: 'number',
        razon_social: 'text',
        provincia: {
            type: 'select',
            url_get: URL_PROVINCIA,
            on_change_field: 'localidad',
            on_change_value_set: URL_LOCALIDAD
        },
        localidad: {
            type: 'select',
            url_get: ''
        },
        afinidad: {
            type: 'select',
            url_get: URL_AFINIDAD_TARIFARIA
        },
        calle: 'text',
        numero: 'number',
        tipo_factura: 'text',
        // id_centro_agenda: 'number',
        propio: 'boolean'
    },
    required: {
        cuit: true,
        razon_social: true,
    },
    text: {
        nombre_fantasia: 'Nombre',
        cuit: 'CUIT',
        razon_social: 'Razón Social',
        provincia: 'Provincia',
        localidad: 'Localidad',
        afinidad: 'Afinidad Tarifaria',
        calle: 'Calle',
        numero: 'Número',
        tipo_factura: 'T.Fact.',
        // id_centro_agenda: 'Id Agenda',
        propio: 'Propio',
    }    
}