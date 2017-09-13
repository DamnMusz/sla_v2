import {URL_PROVINCIA} from '../../rutas';
import {URL_LOCALIDAD} from '../../rutas';
import {URL_AFINIDAD_TARIFARIA} from '../../rutas';
export var edicionCentro = {
    types: {
        nombre_fantasia: 'text',
        cuit: 'number',
        razon_social: 'text',
        provincia_legal_id: {
            type: 'select',
            url_get: URL_PROVINCIA,
            on_change_field: 'localidad_legal_id',
            on_change_value_set: URL_LOCALIDAD
        },
        localidad_legal_id: {
            type: 'select',
            url_get: ''
        },
        afinidad_tarifaria_id: {
            type: 'select',
            url_get: URL_AFINIDAD_TARIFARIA
        },
        direccion_legal_calle: 'text',
        direccion_legal_numero: 'number',
        tipo_factura: 'text',
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
        provincia_legal_id: 'Provincia',
        localidad_legal_id: 'Localidad',
        afinidad_tarifaria_id: 'Afinidad Tarifaria',
        direccion_legal_calle: 'Calle',
        direccion_legal_numero: 'Número',
        tipo_factura: 'T.Fact.',
        propio: 'Propio',
    }    
}