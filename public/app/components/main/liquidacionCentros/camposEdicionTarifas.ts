import {URL_TARIFA_OPTIONS} from '../../rutas';
export var edicionTarifas = {
    types: {
        tarifas: {
            type: 'select',
            url_get: URL_TARIFA_OPTIONS
        },
        desde: 'month',
        hasta: 'month'
    },
    text: {
        tarifas: 'Tarifas',
        desde: 'Desde',
        hasta: 'Hasta',
    }    
}