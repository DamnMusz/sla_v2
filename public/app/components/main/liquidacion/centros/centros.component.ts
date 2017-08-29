import { Component, HostBinding } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'centros-cmp',
    templateUrl: 'footer.component.html'
})

export class CentrosComponent{
    public data = [
        {Nombre: "nombre1", Direccion: "direccion1", Activo: true},
        {Nombre: "nombre2", Direccion: "direccion2", Activo: false}
    ]
}
