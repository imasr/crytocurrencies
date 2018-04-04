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
  currency: any;
  currencyName; any;
  currentyType = 'usd';
  constructor(private _activatedRoute: ActivatedRoute, private apiService: ApiTickerService) { }

  ngOnInit() {
    // Initialize exporting module.
    Exporting(Highcharts);

    this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.currencyName = params.get('currencyName');
      this.apiService.specificCurrency(this.currencyName).subscribe(res => {
          this.currency = res;
          this.getApecific(this.currencyName);
      });
    });
  }

  getApecific(currency) {

    let seriesOptions = [];
    let seriesCounter = 0;
    let names = ['market_cap_by_available_supply', 'price_btc', 'price_btc', 'volume_usd'];

    this.apiService.chart(currency).subscribe(graphData => {
        _.forEach(names, (name, key) => {
             seriesOptions[key] = { name: name, data: graphData[name] };

             seriesCounter += 1;

             if (seriesCounter === names.length) {
               console.log(seriesOptions);
               this.chartOn(seriesOptions);
             }
        });
    });
  }

  chartOn(seriesOptions) {
      Highcharts.stockChart('container', {

        rangeSelector: {
            selected: 5
        },
        title: {
        text: this.currencyName.toUpperCase() + ' ' + 'CHART',
        align: 'left',
        x: 0
    },
        yAxis: {
            title: {
                text: '<span style="color:#009e73;font-weight:bold;fill:#009e73;">Price (USD)</span>'
            },
            crosshair: {
                label: {
                    enabled: true,
                    format: '{value:.2f}'
                }
            },
            labels: {
                align: 'left',
                y: 6,
                x: 2
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
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}  USD</b> <br/>',
            valueDecimals: 2,
            shared: true,
            split: false
        },

        series: seriesOptions
    });

  }
}
