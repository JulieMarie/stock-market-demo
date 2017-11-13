import { Component, OnInit } from '@angular/core'

import { TdLoadingService, TdDigitsPipe } from '@covalent/core';
import { NewsService } from '../../services/news.service';

import { data } from '../../data/quote_series';
import { news } from '../../data/news';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  viewProviders: [ NewsService ]
})
export class DashboardComponent {
  routes: Object[] = [{
    icon: 'dashboard',
    route: '.',
    title: 'Dashboard',
  }, {
    icon: 'library_books',
    route: '.',
    title: 'News',
  }];

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

  constructor(private _newsService: NewsService,
              private _loadingService: TdLoadingService) {
    this.multi = data.map((group: any) => {
      group.series = group.series.map((dataItem: any) => {
        dataItem.name = new Date(dataItem.name);
        return dataItem;
      });
      return group;
    });  
    this.news = news;  
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
  }

  // ngx transform using covalent digits pipe
  axisDigits(val: any): any {
    return new TdDigitsPipe().transform(val);
  }
}
