import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApiTickerService } from '../api-ticker.service';
import * as Highcharts from 'highcharts/highstock';
import * as Exporting from 'highcharts/modules/exporting';
import * as _ from 'lodash';



@Component({
  selector: 'app-specific-currency',
  templateUrl: './specific-currency.component.html',
  styleUrls: ['./specific-currency.component.css']
})
export class SpecificCurrencyComponent implements OnInit  {
  currencyName: any;
  constructor(private _activatedRoute: ActivatedRoute, private apiService: ApiTickerService) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let currency= params.get('currencyName');
      this.getApecific(currency);
    })
    // Initialize exporting module.
    Exporting(Highcharts);
  }
 
  getApecific(currency) {
    this.apiService.specificCurrency(currency).subscribe(res => {
      console.log(res)
    });
    let seriesOptions = [],
      seriesCounter = 0,
      names = ['MarketCap', 'Price(USD)', 'Price(BTC)', '24hVol'];
      // Generate the chart
      Highcharts.stockChart('container', {

        rangeSelector: {
            selected: 4
        },

        yAxis: {
            labels: {
                formatter: function () {
                    return (this.value > 0 ? ' + ' : '') + this.value + '%';
                }
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: 'silver'
            }]
        },

        plotOptions: {
            series: {
                compare: 'percent',
                showInNavigator: true
            }
        },

        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
            valueDecimals: 2,
            split: true
        },

        series: seriesOptions
    });
  }
}
