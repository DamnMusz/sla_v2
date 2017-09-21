import {URL_PROVINCIA} from '../../rutas';
import {URL_LOCALIDAD} from '../../rutas';
import {URL_AFINIDAD_TARIFARIA} from '../../rutas';
export var creacionCentro = {
    types: {
        nombre: 'text',
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
        calle: 'text',
        numero: 'number',
        tipo_factura: 'text',
        propio: 'boolean',
        email: 'email'
    },
    text: {
        nombre: 'Nombre (id en triki)',
        cuit: 'CUIT',
        razon_social: 'Razón Social',
        provincia_legal_id: 'Provincia',
        localidad_legal_id: 'Localidad',
        afinidad_tarifaria_id: 'Afinidad Tarifaria',
        calle: 'Calle',
        numero: 'Nro.',
        tipo_factura: 'Tipo de Factura',
        propio: 'Propio',
        email: 'Email'
    }    
}