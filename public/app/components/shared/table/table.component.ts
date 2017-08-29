import { Component, Input, SimpleChange } from '@angular/core';
import {NgZone} from '@angular/core'
import { DefaultServices } from '../defaultServices/defaultServices'

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
    public keys:string[];
    constructor(private defaultService: DefaultServices) {
    }
    ngOnInit(){
        console.log("ON INIT: " + this.url);
        this.defaultService.getCentrosFacturacion(this.url).subscribe(
        (centrosData) => {
            console.log(centrosData);
            this.data = centrosData.slice(0);
            console.log(this.data);
        },
        err => console.error("EL ERROR FUE: ", err)
        );        
        if(this.data && this.data.length > 0)
            this.keys = Object.keys(this.data[0]);
        else
            this.keys = [];
    }

    changeLog: string[] = [];
 
    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        let log: string[] = [];
        for (let propName in changes) {
        let changedProp = changes[propName];
        
        let to = JSON.stringify(changedProp.currentValue);
        if (changedProp.isFirstChange()) {
            log.push(`Initial value of ${propName} set to ${to}`);
        } else {
            let from = JSON.stringify(changedProp.previousValue);
            log.push(`${propName} changed from ${from} to ${to}`);
        }
        }
        console.log(log.join(', '));
    }
}
