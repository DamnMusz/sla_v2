import { Component } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component'
import { ButtonLineComponent } from '../../shared/buttonLine/buttonLine.component'
import { LiqidacionCentrosServices } from './liqCentrosServices'
import { edicionCentro } from './camposEdicionCentro'
import { creacionCentro } from './camposCreacionCentro'
import { edicionTarifas } from './camposEdicionTarifas'

import {URL_LISTA_CENTROS_FACTURACION} from '../../rutas';

declare var jQuery:any;

@Component({
    selector: 'liq-centros-cmp',
    moduleId: module.id,
    templateUrl: 'liqCentros.component.html'
})

export class LiquidacionCentrosComponent {
    url_lista_centros = URL_LISTA_CENTROS_FACTURACION;
    tableTitle = 'Centros de Inspección';
    isTableDataAvailable = false;
    tableData = [];
    tarifarioData = [
        {
            centro: 'Adrogué',
            afinidad: 'Sorensen',
            '01/2016': '$50',
            '02/2016': '$50',
            '03/2016': '$50',
            '04/2016': '$50',
            '05/2016': '$50',
            '06/2016': '$50',
            '07/2016': '$60',
            '08/2016': '$60',
            '09/2016': '$60',
            '10/2016': '$60',
            '11/2016': '$60',
            '12/2016': '$60',
        },
        {
            centro: 'Lanús',
            afinidad: 'Milla',
            '01/2016': '$60',
            '02/2016': '$60',
            '03/2016': '$60',
            '04/2016': '$60',
            '05/2016': '$60',
            '06/2016': '$60',
            '07/2016': '$80',
            '08/2016': '$80',
            '09/2016': '$80',
            '10/2016': '$80',
            '11/2016': '$80',
            '12/2016': '$80',
        },
        {
            id: '1',
            centro: 'Moreno',
            afinidad: 'Sorensen',
            '01/2016': '$50',
            '02/2016': '$50',
            '03/2016': '$50',
            '04/2016': '$50',
            '05/2016': '$50',
            '06/2016': '$50',
            '07/2016': '$60',
            '08/2016': '$60',
            '09/2016': '$60',
            '10/2016': '$60',
            '11/2016': '$60',
            '12/2016': '$60',
        }
    ];
    camposEdicionCentro = edicionCentro;
    camposEdicionTarifas = edicionTarifas;
    camposCreacionCentro = creacionCentro;
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
