import { Component } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component'
import { ButtonLineComponent } from '../../shared/buttonLine/buttonLine.component'
import { LiqidacionCentrosServices } from './liqCentrosServices'
import { edicionCentro } from './camposEdicionCentro'

import {URL_LISTA_CENTROS_FACTURACION} from '../../rutas';

declare var jQuery:any;

@Component({
    selector: 'liq-centros-cmp',
    moduleId: module.id,
    templateUrl: 'liqCentros.component.html'
})

export class LiquidacionCentrosComponent{
    url_lista_centros = URL_LISTA_CENTROS_FACTURACION;
    tableTitle = 'Centros de Inspección';
    isTableDataAvailable = false;
    tableData = [];
    camposEdicion = edicionCentro;
    buttonData = [
        {id: 0, nombre: "Centros", color: "btn-danger"},
        {id: 1, nombre: "Tarifas", color: "btn-primary"},
        {id: 2, nombre: "Facturar", color: "btn-success"},
    ];
    vista = {
        centros: true,
        tarifas: false,
        facturar: false
    };

    constructor(private liqCentrosService: LiqidacionCentrosServices) {
      this.liqCentrosService.getCentrosFacturacion().subscribe(
      (centrosData) => {
          this.tableData = centrosData.slice(0);
          this.isTableDataAvailable = true;
      },
      err => console.error("EL ERROR FUE: ", err)
      );
    }

    ngOnInit() {}

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
