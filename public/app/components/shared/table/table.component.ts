import { Component, Input, SimpleChange } from '@angular/core';
import { NgZone } from '@angular/core'
import { DefaultServices } from '../defaultServices/defaultServices'

var $:any;

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html',
    styleUrls: ['style.css']
})

export class TableComponent {
    @Input() title:string;
    @Input() subtitle:string;
    @Input() data:any;
    @Input() url:any;
    @Input() editableRows:boolean = false;
    @Input() editTitle: string = "Editar";
    @Input() camposEdicion;
    public keys:string[];
    public keysEdicion:string[];
    showModal:boolean = true;

    constructor(private defaultService: DefaultServices) {}

    ngOnInit() {
        if(this.data && this.data.length > 0)
            this.keys = Object.keys(this.data[0]);
        else
            this.keys = [];
        if(this.camposEdicion.text)
            this.keysEdicion = Object.keys(this.camposEdicion.text);
        else
            this.keysEdicion = [];
    }
    
    toogleModal(event) {
        if (event.currentTarget === event.target) {
            this.showModal= !this.showModal;        
        }
    }

    isCombo(key) {
        return (typeof this.camposEdicion.types[key] == 'object' && this.camposEdicion.types[key].type == 'select')
    }
}
