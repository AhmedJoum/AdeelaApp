import { RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';


@Injectable()
export class WebServiceConfig {
// public RootUrl = '/api';
 public RootUrl = 'http://197.254.204.50/hrapi';

 public TokenKey: string
 public ActionUrl: string;

 constructor(public http: Http,){

 }

 

    public getRequestOptions(TokenKey?: string) {
        let headerWithToken = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + TokenKey
        });

        return new RequestOptions({ headers: headerWithToken });
    }



    public get() {
        return this.http.get(this.RootUrl + this.ActionUrl,
          this.getRequestOptions(this.TokenKey))
          .map(res => res.json());
      }



      public post(postObject: any) {
        return this.http.post(this.RootUrl + this.ActionUrl,
            postObject,
          this.getRequestOptions(this.TokenKey))
          .map(res => res.json());
      }
    

  
}

