import { Component } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component'
import { ButtonLineComponent } from '../../shared/buttonLine/buttonLine.component'
import { DefaultServices } from '../../shared/defaultServices/defaultServices'
import { edicionCentro } from './camposEdicionCentro'
import { creacionCentro } from './camposCreacionCentro'
import { edicionTarifas } from './camposEdicionTarifas'
import { creacionTarifas } from './camposCreacionTarifas'

import {URL_LISTA_CENTROS_FACTURACION} from '../../rutas';
import {URL_TARIFA} from '../../rutas';
import {URL_TARIFARIO} from '../../rutas';

declare var jQuery:any;

@Component({
    selector: 'liq-centros-cmp',
    moduleId: module.id,
    templateUrl: 'liqCentros.component.html'
})

export class LiquidacionCentrosComponent {
    listaCentrosURL = URL_LISTA_CENTROS_FACTURACION;
    tarifaURL = URL_TARIFA; 
    tarifarioURL = URL_TARIFARIO+'?from=2017-01-01&to=2017-12-01'; 
    tarifarioPostURL = URL_TARIFARIO;
    tableTitle = 'Centros de Inspección';
    camposEdicionCentro = edicionCentro;
    camposEdicionTarifas = edicionTarifas;
    camposCreacionCentro = creacionCentro;
    camposCreacionTarifas = creacionTarifas;
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

    constructor(private liqCentrosService: DefaultServices) {}

    ngOnInit() {}

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
