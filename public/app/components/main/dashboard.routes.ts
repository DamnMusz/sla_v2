import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { IconsComponent } from './icons/icons.component';
import { TableComponent } from './table/table.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TypographyComponent } from './typography/typography.component';
import { MapsComponent } from './maps/maps.component';
import { UpgradeComponent } from './upgrade/upgrade.component';

import { SLAComponent } from './sla/sla.component';

export const MODULE_ROUTES: Route[] =[
    { path: 'home', component: HomeComponent },
    { path: 'user', component: UserComponent },
    { path: 'sla', component: SLAComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'table', component: MapsComponent },
    { path: 'upgrade', component: UpgradeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
]

export const MODULE_COMPONENTS = [
    HomeComponent,
    UserComponent,
    TableComponent,
    IconsComponent,
    NotificationsComponent,
    TypographyComponent,
    MapsComponent,
    SLAComponent,
    UpgradeComponent
]
