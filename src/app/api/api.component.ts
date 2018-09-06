import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { OHLC, ApiService  } from '../api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {
  // apiUrl = 'https://api.iextrading.com/1.0/stock/aapl/ohlc';
  ohlc: OHLC;
  error: any;
  headers: string[];

  constructor(
    // private http: HttpClient
    private apiService: ApiService
  ) { }
  getData(stock: string) {
    this.apiService.getOHLC(stock)
.subscribe((data: OHLC) => this.ohlc = {...data}); }
    // this.http.get<OHLC>(this.apiUrl).subscribe((data: OHLC) => this.ohlc = {...data}); }
  /**
   * clear() {
    this.ohlc = undefined;
    this.error = undefined;
    this.headers = undefined;
  }**/


  showOHLCResponse(stock: string) {
    this.apiService.getOHLCResponse(stock)
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);
        // access the body directly, which is typed as `Config`.
        this.ohlc = { ... resp.body };
      });
  }


  showOHLC(stock: string) {
    this.apiService.getOHLC(stock)
      .subscribe(
        (data: OHLC) => this.ohlc = { ...data }, // success path
        error => this.error = error // error path
      );
  }

  ngOnInit() {
    this.showOHLC('i bm');
    // this.showOHLCResponse('appl');
    // this.showOHLC('appl');
    // this.getData('a l');
    // this.showOHLCResponse('a  l');
    // this.showOHLC('al');
  }
}
