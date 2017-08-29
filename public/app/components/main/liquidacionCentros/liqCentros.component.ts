import { Component } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component'
import { ButtonLineComponent } from '../../shared/buttonLine/buttonLine.component'
import { LiqidacionCentrosServices } from './liqCentrosServices'

import {URL_LISTA_CENTROS_FACTURACION} from '../../rutas';

@Component({
    selector: 'liq-centros-cmp',
    moduleId: module.id,
    templateUrl: 'liqCentros.component.html'
})

export class LiquidacionCentrosComponent{
    url_lista_centros = URL_LISTA_CENTROS_FACTURACION;
    tableTitle = 'Centros de Inspección';
    tableData = [];
    buttonData = [
        {id: 0, nombre: "Centros", color: "btn-danger"},
        {id: 1, nombre: "Tarifas", color: "btn-primary"},
    ];
    vista = {
        centros: true,
        tarifas: false,
        facturar: false
    };

    constructor(private liqCentrosService: LiqidacionCentrosServices) {}

    ngOnInit() {
    }

    getCentrosFacturacion() {
        return this.tableData;
    }

    handleSelection(selected) {
        switch (selected) {
            case 0:
                this.vista = {
                    centros: true,
                    tarifas: false,
                    facturar: false
                }
            break;
            case 1:
                this.vista = {
                    centros: false,
                    tarifas: true,
                    facturar: false
                }
            break;
            case 2:
                this.vista = {
                    centros: false,
                    tarifas: false,
                    facturar: true
                }
            break;
            default:
                break;
        }
    }
}
