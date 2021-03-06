import { HTTP } from '@ionic-native/http';
import { HttpClient } from '@angular/common/http';
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
    const full_url = this.url_api + endPoint;
    // console.warn("La Url FULL: ", full_url, JSON.stringify(body));
    let postData = new FormData();
    postData.append('body', JSON.stringify(body));
    postData.append('keyClient', ENVIRONMENT.KEY_CLIENT);
    return this._http.post(full_url, postData);
  }

  public put(endPoint: string, body: any) {
    const full_url = this.url_api + endPoint;
    return this.http.post(full_url, body, {});
  }

  public delete() {

  }

}
