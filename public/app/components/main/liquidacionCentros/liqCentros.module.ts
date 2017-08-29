import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { LiquidacionCentrosComponent } from './liqCentros.component';
import { TableComponent } from '../../shared/table/table.component';
import { ButtonLineComponent } from '../../shared/buttonLine/buttonLine.component';
import { LiqidacionCentrosServices } from './liqCentrosServices'
import { DefaultServices } from '../../shared/defaultServices/defaultServices'

@NgModule({
    imports: [ RouterModule, CommonModule, HttpModule ],
    declarations: [ 
        LiquidacionCentrosComponent, 
        TableComponent,
        ButtonLineComponent
    ],
    exports: [ LiquidacionCentrosComponent ],
    providers: [
        LiqidacionCentrosServices,
        DefaultServices
    ]
})

export class LiquidacionCentrosModule {
}
