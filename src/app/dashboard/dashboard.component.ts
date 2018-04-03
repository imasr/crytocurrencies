import { Component, OnInit } from '@angular/core';
import { ApiTickerService } from '../api-ticker.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  limit = 10;
  start = 0;
  currency: any;
  currentyType = "usd";
  currencyList = [];

  constructor(private apiService: ApiTickerService, private router: Router) {}

  ngOnInit() {
    const data = `?start=${this.start}&limit=${this.limit}`;
    this.apiService.currencies(data).subscribe(res => {
      console.log(res);
      this.currency = res;
      _.forEach(this.currency, (value, key) => {
        this.currencyList.push(value.id);
      });
    });
  }

}
