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
    @Input() color;
    @Input() addItemOption:boolean = false;
    @Input() exportable:boolean = true;
    public keys:string[];
    public keysEdicion:string[];
    showModal:boolean = true;
    isDataAvailable: boolean = false;
    reverseSort = false;

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
        this.isDataAvailable = true
    }
    
    toogleModal(event) {
        if (event.currentTarget === event.target) {
            this.showModal= !this.showModal;        
        }
    }

    isCombo(key) {
        return (typeof this.camposEdicion.types[key] == 'object' && this.camposEdicion.types[key].type == 'select')
    }

    getColor() {
        return this.color;
    }

    buttonType() {
        let color = this.getColorType();
        if(color!='')
            return 'btn-'+color;
        else
            return 'btn-danger';
    }

    getColorType() {
        if(this.color=='red')
            return 'danger';
        if(this.color=='purple')
            return 'primary';
        if(this.color=='green')
            return 'success';
        if(this.color=='yellow')
            return 'warning';
        return 'danger';
    }

    compare(key, reverse) {
        return function(a, b) {
            if (a[key] < b[key])
                return reverse?1:-1;
            if (a[key] > b[key])
                return reverse?-1:1;
            return 0;
        }
    }

    sortBy(key) {
        this.data.sort(this.compare(key, this.reverseSort));
        this.reverseSort = !this.reverseSort;
    }

    json_to_csv() {
        var str = '';
        
        var line = '';
        for (var index in this.keys) {
            if (line != '') line += ','
            line += this.keys[index];
        }
        str += line + '\r\n';
        for (var i = 0; i < this.data.length; i++) {
            var line = '';
            for (var index in this.keys) {
                if (line != '') line += ','
                line += this.data[i][this.keys[index]];
            }
            str += line + '\r\n';
        }
        let strReplace = [
            {from: 'á', to: 'a'},
            {from: 'é', to: 'e'},
            {from: 'í', to: 'i'},
            {from: 'ó', to: 'o'},
            {from: 'ú', to: 'u'},
            {from: 'null', to: ''}
        ]
        var res = str;
        strReplace.forEach(element => {
            var myRegExp = new RegExp(element.from,'gim');
            res = res.replace(myRegExp, element.to);
        });        
        return res;
    }

    download_as_file = function (data, filename) {
        var hiddenElement = document.createElement('a');

        document.body.appendChild(hiddenElement);
        hiddenElement.href = 'data:attachment/text,' + encodeURIComponent(data);
        hiddenElement.target = '_blank';
        hiddenElement.download = filename;
        hiddenElement.click();
    }

    export() {
        this.download_as_file(this.json_to_csv(), this.title+'.csv');
    }
}
