export var creacionCentro = {
    types: {
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
        afinidad: {
            type: 'select',
            url_get: 'afinidadTarifaria'
        },
        propio: 'boolean',
        calle: 'text',
        numero: 'number',
        tipo_factura: 'text'
    },
    text: {
        nombre_fantasia: 'Nombre Fantasía',
        cuit: 'CUIT',
        razon_social: 'Razón Social',
        provincia: 'Provincia',
        localidad: 'Localidad',
        afinidad: 'Afinidad Tarifaria',
        propio: 'Propio',
        calle: 'Calle',
        numero: 'Nro.',
        tipo_factura: 'Tipo de Factura'
    }    
}