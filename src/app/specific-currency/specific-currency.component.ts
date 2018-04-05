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
  currencyType = 'usd';
  loader: any;
  constructor(private _activatedRoute: ActivatedRoute, private apiService: ApiTickerService) { }

  ngOnInit() {
    // Initialize exporting module.
    Exporting(Highcharts);

    this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.currencyName = params.get('currencyName');
      this.apiService.specificCurrency(this.currencyName).subscribe(res => {
          this.currency = res[0];
          this.graphData(this.currencyName);
      });
    });
  }

  graphData(currency) {
    this.loader = true;
    const seriesOptions = [];
    let seriesCounter = 0;
    const names = ['market_cap_by_available_supply', 'price_btc', 'price_usd', 'volume_usd'];

    this.apiService.chart(currency).subscribe(data => {
        _.forEach(names, (name, key) => {
             seriesOptions[key] = { name: name, data: data[name] };
             seriesCounter += 1;
             if (seriesCounter === names.length) {
               this.chartOn(seriesOptions);
             }
        });
    });
  }

  chartOn(seriesOptions) {
      this.loader = false;
      Highcharts.stockChart('container', {

        rangeSelector: {
            selected: 4
        },
        title: {
            text: this.currencyName.toUpperCase() + ' ' + 'CHART',
            align: 'left',
            x: 0
        },
        yAxis: [
          {
            title: {
                text: '<span style="color:#009e73;font-weight:bold;fill:#009e73;">Price (USD)</span>'
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
        }, {
            title: {
                text: '<span style="color:orange;font-weight:bold;fill:orange;">Price (BTC)</span>'
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
        }, {
            title: {
                text: '<span style="color:#219dfd;font-weight:bold;fill:#219dfd;">Market Cap</span>'
            },
            opposite: false
        }],
        legend: {
            enabled: true
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
