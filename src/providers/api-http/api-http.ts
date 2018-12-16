import { HTTP } from '@ionic-native/http';
import { Injectable } from '@angular/core';
import { ENVIRONMENT } from '../../environment/environment';

@Injectable()
export class ApiHttpProvider {
  
  private url_api: string;
  private headers;

  constructor(public http: HTTP) {
    this.url_api = ENVIRONMENT.URL_API;
    this.headers = {
      'Content-Type': 'application/json'
    };
  }

  public get(endPoint: string) {
    const full_url = this.url_api + endPoint;
    return this.http.get(full_url, {}, this.headers).then( data => data );
  }

  public post() {

  }

  public put() {

  }

  public delete() {

  }

}
