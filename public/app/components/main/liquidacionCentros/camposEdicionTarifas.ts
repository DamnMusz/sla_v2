import {URL_TARIFA} from '../../rutas';
export var edicionTarifas = {
    types: {
        tarifas: {
            type: 'select',
            url_get: URL_TARIFA
        },
        desde: {
            type: 'select',
            url_get: ''
        },
        hasta: {
            type: 'select',
            url_get: ''
        }
    },
    text: {
        tarifas: 'Tarifas',
        desde: 'Desde',
        hasta: 'Hasta',
    }    
}