import { Component, OnInit } from '@angular/core';
import { ApiTickerService } from '../api-ticker.service';
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
  data: any;
  currencyList = [];
  filteredList = [];
  constructor(private apiService: ApiTickerService) {}

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
  filter(event) {
    if (event !== '') {
      this.filteredList = this.currencyList.filter(function(el) {
          return el.toLowerCase().indexOf(event.toLowerCase()) > -1;
        }.bind(this));
    } else {
      this.filteredList = [];
    }
  }
  onSearch() {}
}
