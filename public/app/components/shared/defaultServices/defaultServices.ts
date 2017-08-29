import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DefaultServices{
  constructor(private http:Http) {}

  getCentrosFacturacion(URL:string) {
    return this.http.get(URL).map((response) => response.json());
  }
}