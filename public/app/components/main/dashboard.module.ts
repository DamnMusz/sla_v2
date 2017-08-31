import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CentrosComponent } from './liquidacionCentros/centros.component';
import { HomeComponent } from './home/home.component';
import { SLAComponent } from './sla/sla.component';

import { LiquidacionCentrosModule } from './liquidacionCentros/liqCentros.module';

@NgModule({
    imports: [
        LiquidacionCentrosModule,
        CommonModule,
        RouterModule.forChild(
            [
                { path: 'home', component: HomeComponent },
                { path: 'liqCentros', component: CentrosComponent },
                { path: '', redirectTo: 'home', pathMatch: 'full' }
            ]
        )
    ],
    declarations: [
        HomeComponent,
        SLAComponent,
        CentrosComponent,
    ]
})

export class DashboardModule{}
