import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {URL_LISTA_CENTROS_FACTURACION} from '../../rutas';

@Injectable()
export class LiqidacionCentrosServices{
  constructor(private http:Http) {}

  getCentrosFacturacion() {
    return this.http.get(URL_LISTA_CENTROS_FACTURACION).map((response) => response.json());
  }
}
