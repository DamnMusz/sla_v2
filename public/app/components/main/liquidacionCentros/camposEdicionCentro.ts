export var edicionCentro = {
    types: {
        //nombre: 'text',
        nombre_fantasia: 'text',
        cuit: 'number',
        razon_social: 'text',
        provincia: {
            type: 'select',
            url_get: 'provincia'
        },
        localidad: {
            type: 'select',
            url_get: 'localidad'
        },
        propio: 'boolean',
        calle: 'text',
        numero: 'number',
        afinidad: {
            type: 'select',
            url_get: 'afinidadTarifaria'
        },
        tipo_factura: 'text'
    },
    text: {
        nombre_fantasia: 'Nombre Fantasía',
        cuit: 'CUIT',
        razon_social: 'Razón Social',
        provincia: 'Provincia',
        localidad: 'Localidad',
        propio: 'Propio',
        calle: 'Calle',
        numero: 'Nro.',
        afinidad: 'Afinidad Tarifaria',
        tipo_factura: 'Tipo de Factura'
    }    
}