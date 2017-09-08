import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { LiquidacionCentrosComponent } from './liqCentros.component';
import { TableComponent } from '../../shared/table/table.component';
import { ButtonLineComponent } from '../../shared/buttonLine/buttonLine.component';
import { DropdownComponent } from '../../shared/dropdown/dropdown.component';

import { LiqidacionCentrosServices } from './liqCentrosServices';
import { DefaultServices } from '../../shared/defaultServices/defaultServices';
import { DropdownServices } from '../../shared/dropdown/dropdownServices';


@NgModule({
    imports: [ 
        RouterModule, 
        CommonModule, 
        HttpModule,
        BrowserModule,
        FormsModule
    ],
    declarations: [ 
        LiquidacionCentrosComponent, 
        TableComponent,
        ButtonLineComponent,
        DropdownComponent
    ],
    exports: [ LiquidacionCentrosComponent ],
    providers: [
        LiqidacionCentrosServices,
        DropdownServices,
        DefaultServices
    ]
})

export class LiquidacionCentrosModule {}
