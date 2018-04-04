import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ApiTickerService {
  constructor(private httpIntercept: HttpClient) {}
  private childMethodCall = new Subject<any>();
  componentMehtodCalled$ = this.childMethodCall.asObservable();
  currencies(data): Observable<any> {
    return this.httpIntercept.get(environment.apiUrl + `ticker/${data}/`)
        .map(res => {
            this.childMethodCall.next(res);
            return res;
        })
        .catch(err => {
            return Observable.throw(err || 'Server error');
        });
  }
  specificCurrency(currencyName): Observable<any> {
    return this.httpIntercept.get(environment.apiUrl + `ticker/${currencyName}/`)
        .map(res => {
            return res;
        })
        .catch(err => {
            return Observable.throw(err || 'Server error');
        });
  }
  chart(currencyName) {
       return this.httpIntercept.get(`https://graphs2.coinmarketcap.com/currencies/${currencyName}/`)
        .map(res => {
            return res;
        })
        .catch(err => {
            return Observable.throw(err || 'Server error');
        });
  }
  globalData() {
        return this.httpIntercept.get(`https://graphs2.coinmarketcap.com/v1/global/`)
        .map(res => {
            return res;
        })
        .catch(err => {
            return Observable.throw(err || 'Server error');
        });
    }
}
