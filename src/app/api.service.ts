import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

export interface OHLC {
  open: {
    price: number,
    time: number
  };
  close: {
    price: number;
    time: number
  };
  high: number;
  low: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // cmp = 'aapl';
  searchtype = 'ohlc';
  apiUrl = 'https://api.iextrading.com/1.0/stock/';
  constructor(private http: HttpClient) { }
  getOHLC(cmp: string) {
      console.log('get data');
      return this.http
      .get<OHLC>(this.apiUrl + cmp + '/' + this.searchtype)
      .pipe(
        retry(2), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }
  /**
   * getApiResponse(): OHLC {
    return this.http.get(this.apiUrl, { observe: 'response' });
  }
  **/
 getOHLCResponse(cmp: string): Observable<HttpResponse<OHLC>> {
  return this.http.get<OHLC>(
    (this.apiUrl + cmp + '/' + this.searchtype), { observe: 'response' });
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
