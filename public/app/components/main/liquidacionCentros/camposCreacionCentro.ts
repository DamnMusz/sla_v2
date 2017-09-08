import {URL_PROVINCIA} from '../../rutas';
import {URL_LOCALIDAD} from '../../rutas';
import {URL_AFINIDAD_TARIFARIA} from '../../rutas';
export var creacionCentro = {
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
        propio: 'boolean',
        // id_centro_agenda: 'number'
    },
    text: {
        nombre_fantasia: 'Nombre Fantasía',
        cuit: 'CUIT',
        razon_social: 'Razón Social',
        provincia: 'Provincia',
        localidad: 'Localidad',
        afinidad: 'Afinidad Tarifaria',
        calle: 'Calle',
        numero: 'Nro.',
        tipo_factura: 'Tipo de Factura',
        propio: 'Propio',
        // id_centro_agenda: 'Id Agenda'
    }    
}