import { Component, OnInit } from '@angular/core';

declare var $:any;
@Component({
    moduleId: module.id,
    selector: 'login-cmp',
    templateUrl: 'login.component.html',
})

export class LoginComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
    }
}
