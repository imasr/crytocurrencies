import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiTickerService } from '../api-ticker.service';
import * as _ from 'lodash';
import { Config } from '../../config/config';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currencyList = [];
  filteredList = [];
  search: any;
  global: any;
  convertCurrency: any;
  constructor(private router: Router, private apiEvent: ApiTickerService) {}

  ngOnInit() {
      this.convertCurrency = Config['currencyData'];
      this.apiEvent.componentMehtodCalled$.subscribe(res => {
        let array=[];
        _.forEach(res, (val, key) => {
            array.push(val.id);
        });
        this.currencyList=array;
        console.log(this.currencyList);        
      })
      this.apiEvent.globalData().subscribe(res => {
          this.global=res;
      })
  }
  filter(event) {
    if (event !== "") {
      this.filteredList = this.currencyList.filter(function(el) {
          return el.toLowerCase().indexOf(event.toLowerCase()) > -1;
        }.bind(this)
      );
    } else {
      this.filteredList = [];
    }
    console.log(this.filteredList)
  }
  onSearch(data) {
    console.log(data);
    this.search = data;
    this.filteredList = [];
    this.router.navigate(['currencies', this.search]);
  }

}
