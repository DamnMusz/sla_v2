import { Component, Input, SimpleChange } from '@angular/core';
import {NgZone} from '@angular/core'
import { DefaultServices } from '../defaultServices/defaultServices'

var $:any;

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class TableComponent {
    @Input() title:string;
    @Input() subtitle:string;
    @Input() data:any;
    @Input() url:any;
    @Input() editableRows:boolean = false;
    public keys:string[];

    constructor(private defaultService: DefaultServices) {}

    ngOnInit() {
        if(this.data && this.data.length > 0)
            this.keys = Object.keys(this.data[0]);
        else
            this.keys = [];
    }
}
