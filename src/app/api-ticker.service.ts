
import {throwError as observableThrowError,  Observable ,  Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import * as _ from 'lodash';

@Injectable()
export class ApiTickerService {
  constructor(private httpIntercept: HttpClient) {}
  private childMethodCall = new Subject<any>();
  componentMehtodCalled$ = this.childMethodCall.asObservable();
  currencies(data): Observable<any> {
    return this.httpIntercept.get(environment.apiUrl + `ticker/${data}/`).pipe(
        map(res => {
            this.childMethodCall.next(res);
            return res;
        }),
        catchError(err => {
            return observableThrowError(err || 'Server error');
        }));
  }
  specificCurrency(currencyName): Observable<any> {
    return this.httpIntercept.get(environment.apiUrl + `ticker/${currencyName}/`).pipe(
        map(res => {
            return res;
        }),
        catchError(err => {
            return observableThrowError(err || 'Server error');
        }));
  }
  chart(currencyName) {
       return this.httpIntercept.get(`https://graphs2.coinmarketcap.com/currencies/${currencyName}/`).pipe(
        map(res => {
            return res;
        }),
        catchError(err => {
            return observableThrowError(err || 'Server error');
        }));
  }
  globalData() {
        return this.httpIntercept.get(environment.apiUrl + `global/`).pipe(
        map(res => {
            return res;
        }),
        catchError(err => {
            return observableThrowError(err || 'Server error');
        }))
    }
}
