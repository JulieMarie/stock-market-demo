import { Component, OnInit } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

import { TdLoadingService, TdDigitsPipe } from '@covalent/core';

import { data } from './quote_series';

@Component({
  selector: 'stock-market-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  viewProviders: []
})
export class AppComponent {
  news: Object[];
  quotes: Object[];
  multi: Object[];
  
  // Generic Chart options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  autoScale: boolean = true;
  showLegend: boolean = false;
  showXAxisLabel: boolean = false;
  showYAxisLabel: boolean = false;
  xAxisLabel: string = 'X Axis';
  yAxisLabel: string = 'Y Axis';

  orangeColorScheme: any = {
    domain: [
      '#E64A19', '#F57C00', '#FFA726',
    ],
  };

  constructor(private _iconRegistry: MatIconRegistry, 
              private _domSanitizer: DomSanitizer,
              private _loadingService: TdLoadingService) {
    this._iconRegistry.addSvgIconInNamespace('assets', 'stock-market',
    this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/stock-market.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'github',
    this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'apple',
    this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/apple-logo.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'amazon',
    this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/amazon-logo.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'google',
    this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/google-logo.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'teradata',
    this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata.svg'));

    this.multi = data.map((group: any) => {
      group.series = group.series.map((dataItem: any) => {
        dataItem.name = new Date(dataItem.name);
        return dataItem;
      });
      return group;
    });    
  }

  ngOnInit(): void {
    this.quotes = [
      {
        "ticker": "AMZN",
        "last_quote": "1120.66",
        "change": "9.06",
        "up_or_down": "arrow_upward"
      },
      {
        "ticker": "TDC",
        "last_quote": "35.53",
        "change": "-0.56",
        "up_or_down": "arrow_downward"
      },
      {
        "ticker": "AAPL",
        "last_quote": "174.25",
        "change": "1.75",
        "up_or_down": "arrow_upward"
      }
    ];
    this.news = [
      {
        "item_id": "1",
        "headline": "U.S. stock indexes end at records, helped by Apple earnings, ISM data",
        "author": "Anneken Tappe",
        "created" : "11/03/2017 04:03 PM"
      },{
        "item_id": "2",
        "headline": "Qualcomm sees best one-day rally in 9 years on report of Broadcom buyout interest",
        "author": "Wallace Witkowski",
        "created" : "11/03/2017 02:37 PM"
      },{
        "item_id": "3",
        "headline": "Gold ends at a nearly three-month low as dollar index strengthens",
        "author": "Myra P. Saefong",
        "created" : "11/03/2017 01:51 PM"
      },{
        "item_id": "4",
        "headline": "GE's stock falls again, as losing streak stretches to 10 days",
        "author": "Tomi Kilgore",
        "created" : "11/03/2017 10:41 AM"
      },{
        "item_id": "5",
        "headline": "Starbucks shares down 5% after revenue miss, company to sell Tazo brand",
        "author": "Claudia Assis",
        "created" : "11/02/2017 04:20 PM"
      }
    ];
  }

  // ngx transform using covalent digits pipe
  axisDigits(val: any): any {
    return new TdDigitsPipe().transform(val);
  }
}
