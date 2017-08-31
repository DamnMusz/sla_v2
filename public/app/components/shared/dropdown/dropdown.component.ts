import { Component, Input } from '@angular/core';
import { DropdownServices } from './dropdownServices'

@Component({
    selector: 'dropdown-cmp',
    moduleId: module.id,
    templateUrl: 'dropdown.component.html'
})

export class DropdownComponent{
    @Input() title:string;
    @Input() url: string;
    isDataAvailable:boolean = false;
    values = [
        {id: 0, value: "Buenos Aires"},
        {id: 1, value: "Capital Federal"},
        {id: 2, value: "Santa Fe"},
        {id: 3, value: "Córdoba"},
        {id: 4, value: "Santa Cruz"},
    ]
    
    constructor(private service: DropdownServices) {
        
    
    }

    ngOnInit(){
        this.service.getData(this.url).subscribe(
            (data) => {
                this.values = data.slice(0);
                this.isDataAvailable = true;
            },
            err => console.error("EL ERROR FUE: ", err)
        );
    }
}
