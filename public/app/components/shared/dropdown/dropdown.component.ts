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
    values = [];
    selectedItem;
    
    constructor(private service: DropdownServices) {}

    ngOnInit(){
        this.service.getData(this.url).subscribe(
            (data) => {
                this.values = data.slice(0);
                this.isDataAvailable = true;
            },
            err => console.error("EL ERROR FUE: ", err)
        );
    }

    select(item) {
        this.selectedItem = item;
    }
}
