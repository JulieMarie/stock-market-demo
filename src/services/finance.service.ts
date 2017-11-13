import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

interface Quotes {
  ticker?: string,
  last_quote?: string,
  change?: string,
  up_or_down?: string
};

@Injectable()
export class FinanceService {
  public quotes: Array<Quotes> = [];
  private quotesUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=';
  tickers: string[] = ['AAPL', 'AMZN', 'TDC'];
  public holdData = [];

  constructor(private http: Http) {}

  private handleError(error: any) {
    const errMsg = "Invalid ticker symbol";
    alert(errMsg);
  }

  getAllQuotes() {
    for (let ticker of this.tickers) {
      this.getQuoteInfo(ticker).then(data => {
        let series = [];
        for (const key in data['Time Series (Daily)']) {
          series.push({'value': data['Time Series (Daily)'][key]['4. close'], 'name': key});
        }
        this.holdData.push({
          'name': ticker,
          'series': series
        });
        const quote0 = Object.keys(data['Time Series (Daily)'])[0];
        const quote1 = Object.keys(data['Time Series (Daily)'])[1];
        let lastQuote = parseFloat(data[ 'Time Series (Daily)' ][quote0]['4. close']);
        let prevQuote = parseFloat(data[ 'Time Series (Daily)' ][quote1]['4. close']);
        let diff = (lastQuote - prevQuote).toFixed(2);
        this.quotes.push({
          ticker: ticker.toUpperCase(), 
          last_quote: lastQuote.toFixed(2),
          change: diff,
          up_or_down: (lastQuote > prevQuote) ? 'arrow_upward' : 'arrow_downward'
        });
      }).catch(err => this.handleError(err));  
    }
  } 

  getQuoteInfo(ticker: string) {
    return this.http.get(this.quotesUrl+ ticker + '&interval=60min&apikey=8WKPF9XQWOJX41IX')
      .toPromise()
      .then(response => response.json());
  }
} 