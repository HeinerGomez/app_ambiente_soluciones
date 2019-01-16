import { HTTP } from '@ionic-native/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ENVIRONMENT } from '../../environment/environment';

@Injectable()
export class ApiHttpProvider {
  
  private url_api: string;
  private headers;

  constructor(public http: HTTP, public _http: HttpClient) {
    this.url_api = ENVIRONMENT.URL_API;
    this.headers = {
      'Content-Type': 'application/json'
    };
  }

  public get(endPoint: string, params = {}) {
    const full_url = this.url_api + endPoint;
    params['keyClient'] = ENVIRONMENT.KEY_CLIENT;
    return this.http.get(full_url, params, this.headers).then( data => data );
  }

  public post(endPoint: string, body: any) {
    // let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json'
      })
    };
    // let headers: HttpHeaders = {'Content-Type': 'application/x-www-form-urlencoded'};
    const full_url = this.url_api + endPoint;
    let postData = new FormData();
    postData.append('body', JSON.stringify(body));
    postData.append('keyClient', ENVIRONMENT.KEY_CLIENT);
    return this._http.post(full_url, postData);
    // return this.http.post(full_url, body, headers);
    // return this._http.post(full_url, body, httpOptions).pipe( map( (res: any) => {
    //   return res;
    // }));
  }

  public put(endPoint: string, body: any) {
    const full_url = this.url_api + endPoint;
    return this.http.post(full_url, body, {});
  }

  public delete() {

  }

}
