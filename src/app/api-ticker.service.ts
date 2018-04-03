import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import * as _ from 'lodash';

@Injectable()
export class ApiTickerService {
  constructor(private httpIntercept: HttpClient) {}

  currencies(data): Observable<any> {
    return this.httpIntercept.get(environment.apiUrl + `ticker/${data}`)
          .map(res => {
              console.log(res);
              // const array2 = [];

              // _.forEach(res, (value, key) => {
              //     const array = [];
              //     _.forEach(value, (value2, key2) => {
              //       // console.log(value2)
              //         array.push({ key: key2,
              //           value: value2,
              //           show: key2 === 'name' ? true :
              //                 key2 === '24h_volume_usd' ? true :
              //                 key2 === 'market_cap_usd' ? true :
              //                 key2 === 'total_supply' ? true :
              //                 key2 === 'percent_change_24h' ? true :
              //                 key2 === 'percent_change_7d' ? true :
              //                 key2 === 'price_usd' ? true : false
              //         });
              //     });
              //     array2.push(array);
              // });
              return res;
          })
          .catch(err => {
              return Observable.throw(err || 'Server error');
          });
  }
}
