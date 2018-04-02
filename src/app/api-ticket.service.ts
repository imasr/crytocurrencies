import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import { map } from 'rxjs/operators';
@Injectable()
export class ApiTicketService {

  constructor(private http:HttpClient) { }

  currencies() {
    return this.http.get(environment.apiUrl + 'ticker')
    .map(res => {
        console.log(res);
        return res;
    })
    .catch( err => {
      return Observable.throw(err || 'Server error');
    })
  }
}
