import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ApiService {

  private apiURL = '/api';//'http://localhost:6002/api';

  constructor(private http: Http) {}

  getStartups() : Promise<Object> {

    // ...using get request
    return this.http.get(this.apiURL+'/startups')
                    .toPromise()
                // ...and calling .json() on the response to return data
                    .then(response => response.json());
  }

  getBalance(startupId) : Promise<Object> {

    // ...using get request
    return this.http.get(this.apiURL+'/startup/'+startupId+'/balance')
                    .toPromise()
                // ...and calling .json() on the response to return data
                    .then(response => response.json());

  }

  sendDeposit (startupId, value){
        // ...using get request
        console.log(startupId, value);
    return this.http.get(this.apiURL+'/startup/'+startupId+'/deposit/'+value) .toPromise()
                // ...and calling .json() on the response to return data
                    .then(response => response.json());
  }

  sendWithdraw (startupId, value) {
       return this.http.get(this.apiURL+'/startup/'+startupId+'/withdraw/'+value).toPromise()
                // ...and calling .json() on the response to return data
                    .then(response => response.json());
    }

}