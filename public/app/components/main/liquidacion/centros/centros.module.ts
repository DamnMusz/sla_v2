import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CentrosComponent } from './centros.component';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ CentrosComponent ],
    exports: [ CentrosComponent ]
})

export class CentrosModule {}
