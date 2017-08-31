import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {URL_EXPORT_XLS} from '../../rutas';

@Injectable()
export class DefaultServices{
  constructor(private http:Http) {}

  getCentrosFacturacion(URL:string): Observable<any> {
    return this.http.get(URL).map((response) => response.json());
  }

  postGenerateXLS(json: Object): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(URL_EXPORT_XLS, json, {headers: headers});
  }

  exportToXLS(json: Object, filename){
    this.postGenerateXLS(json).subscribe(
        (res) => {
          console.log(res);
            var blob=new Blob([res['_body']]);
            var link=document.createElement('a');
            link.href = 'data:attachment/text,' + encodeURIComponent(res["_body"]);
            link.target = '_blank';
            link.download=filename+".xls";
            link.click();
        },
        err => console.error("EL ERROR FUE: ", err)
    );
  }
}