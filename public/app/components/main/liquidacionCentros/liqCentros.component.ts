import { Component } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component'
import { ButtonLineComponent } from '../../shared/buttonLine/buttonLine.component'
import { DefaultServices } from '../../shared/defaultServices/defaultServices'
import { edicionCentro } from './camposEdicionCentro'
import { creacionCentro } from './camposCreacionCentro'
import { edicionTarifas } from './camposEdicionTarifas'
import { creacionTarifas } from './camposCreacionTarifas'
import { creacionEmail } from './camposCreacionEmail'
import { edicionEmail } from './camposEdicionEmail'

import {
    URL_LISTA_CENTROS_FACTURACION,
    URL_EMAILS_CENTROS_FACTURACION,
    URL_TARIFA,
    URL_TARIFARIO,
    URL_AFINIDAD_TARIFARIA,
    URL_LIQUIDACION_CENTRO,
    URL_MAIL_LIQUIDACION_CENTRO
} from '../../rutas';

declare var jQuery:any;

@Component({
    selector: 'liq-centros-cmp',
    moduleId: module.id,
    templateUrl: 'liqCentros.component.html'
})

export class LiquidacionCentrosComponent {
    listaCentrosURL = URL_LISTA_CENTROS_FACTURACION;
    dateFacturacion = new Date().getFullYear()+'-'+ ("0"+(new Date().getMonth()+1)).slice(-2);
    tarifaYear = new Date().getFullYear();
    tarifaFrom = this.tarifaYear+'-01-01';
    tarifaTo = this.tarifaYear+'-12-31';
    tarifaURL = URL_TARIFA; 
    tarifarioURL = URL_TARIFARIO;
    liqCentroURL = URL_LIQUIDACION_CENTRO;
    emailCentroURL = URL_EMAILS_CENTROS_FACTURACION;
    liqCentroParameters = '?periodo='+this.dateFacturacion;
    tarifarioURLParameters = '?from='+this.tarifaFrom+'&to='+this.tarifaTo;
    tarifarioPostURL = URL_TARIFARIO;
    tableTitle = 'Centros de Inspección';
    camposEdicionCentro = edicionCentro;
    camposEdicionTarifas = edicionTarifas;
    camposCreacionCentro = creacionCentro;
    camposCreacionTarifas = creacionTarifas;
    camposCreacionEmail = creacionEmail;
    camposEdicionEmail = edicionEmail;
    tarifaHeaderButtons = [
        { title: 'anterior', icon_left: 'keyboard_arrow_left', icon_right: '', event: 'prevTarifario' },
        { title: 'posterior', icon_left: '', icon_right: 'keyboard_arrow_right', event: 'nextTarifario' },
    ]
    liquidacionHeaderButtons = [
        { title: 'mes anterior', icon_left: 'keyboard_arrow_left', icon_right: '', event: 'prevLiquidacion' },
        { title: 'mes posterior', icon_left: '', icon_right: 'keyboard_arrow_right', event: 'nextLiquidacion' },
    ]
    centrosHeaderButtons = [
        { title: 'Afinidades Tarifarias', icon_left: 'add', icon_right: '', event: 'addAfinidad' },
    ]
    liqCentroRowButtons = [
        { title: "Mail Enviado", icon: 'mail_outline', icon2: 'done_all', event: 'sendEmail' },
    ]
    buttonData = [
        {id: 0, nombre: "Centros", color: "btn-danger"},
        {id: 1, nombre: "Tarifas", color: "btn-primary"},
        {id: 2, nombre: "Facturar", color: "btn-success"},
        {id: 3, nombre: "Editar Emails", color: "btn-info"}
    ];
    vista:any = { centros: true };
    afinidades = [];
    showModalAfinidad = false;
    selectedAfinidad;
    textAfinidad = "";
    
    constructor(private defaultService: DefaultServices) {}

    ngOnInit() {
        this.afinidades = [{id:0, value:'Crear Nueva Afinidad'}];
    }

    enviarEmail(id) {
        this.defaultService.putJsonData(URL_MAIL_LIQUIDACION_CENTRO+'/'+id,{periodo:this.dateFacturacion}).subscribe(
            (data) => {
                alert("Enviados emails (todavía no)");
            },
            err => alert(err)
        );
    }

    handleSelection(selected) {
        switch (selected) {
            case 0:
                this.vista = { centros: true };
                break;
            case 1:
                this.vista = { tarifas: true };
                break;
            case 2:
                this.vista = { facturar: true };
                break;
            case 3:
                this.vista = { informar: true };
                break;
            default:
                break;
        }
    }

    handleEvent(event) {
        switch (event) {
            case 'prevTarifario':
                    this.tarifaYear = this.tarifaYear-1;
                    this.tarifaFrom = this.tarifaYear+'-01-01';
                    this.tarifaTo = this.tarifaYear+'-12-31';
                    this.tarifarioURLParameters = '?from='+this.tarifaFrom+'&to='+this.tarifaTo;
                break;
            case 'nextTarifario':
                    this.tarifaYear = this.tarifaYear+1;
                    this.tarifaFrom = this.tarifaYear+'-01-01';
                    this.tarifaTo = this.tarifaYear+'-12-31';
                    this.tarifarioURLParameters = '?from='+this.tarifaFrom+'&to='+this.tarifaTo;
                break;
            case 'addAfinidad':
                this.defaultService.getData(URL_AFINIDAD_TARIFARIA).subscribe(
                    (data) => {
                        this.afinidades = [{id:0, value:'Crear Nueva Afinidad'}];
                        data.forEach(element => {
                            this.afinidades.push(element);
                        });
                        this.showModalAfinidad = true;
                    },
                    err => console.error("EL ERROR FUE: ", err)
                );
                break;
            default:
                break;
        }
    }

    handleEventMail(event) {
        this.enviarEmail(event.substring(event.indexOf('/')+1));
    }

    onDateFactChange(event) {
        this.dateFacturacion = event;
        this.liqCentroParameters = '?periodo='+this.dateFacturacion;
    }

    toogleModal(event, accion, row = undefined) {
        if (event.currentTarget === event.target) {
            this.selectedAfinidad;
            this.textAfinidad = "";
            this.showModalAfinidad= !this.showModalAfinidad;
        }
    }

    selectAfinidad(event) {
        this.selectedAfinidad = event.value;
        if(this.selectedAfinidad.id == 0)
            this.textAfinidad = '';
        else
            this.textAfinidad = this.selectedAfinidad.value;
    }

    commitAfinidad(event) {
        console.log(this.selectedAfinidad);
        console.log(this.textAfinidad);
        if(this.selectedAfinidad) {
            if(this.selectedAfinidad.id == 0) {
                this.defaultService.postJsonData(URL_AFINIDAD_TARIFARIA,{nombre:this.textAfinidad}).subscribe(
                    () => {
                        this.showModalAfinidad = false;
                    },
                    err => console.error("EL ERROR FUE: ", err)
                );
            } else {
                this.defaultService.putJsonData(URL_AFINIDAD_TARIFARIA,{id: this.selectedAfinidad.id,nombre:this.textAfinidad}).subscribe(
                    () => {
                        this.showModalAfinidad = false;
                    },
                    err => console.error("EL ERROR FUE: ", err)
                );
            }
        }
        this.toogleModal(event, 'afinidad');
    }
}
