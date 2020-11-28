import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { APIheader } from 'app/models/APIheader';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) { }

  public get(serviceName: string, headerList: APIheader[], data: string): Observable<any> {

    let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key);
    headerList.forEach(function (item) {
      
      headers = headers.append(item.Key, item.value);
    })

    const url = environment.apiURL + serviceName + data;
    return this.httpClient.get(url, { headers });

  }

  post(serviceName: string, data: any, headerList: APIheader[]): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').append("OcpApimSubscriptionKey", environment.Ocp_Apim_Subscription_Key).append("access-control-allow-origin", "*").append("dataType","json").append("Accept","application/json, text/javascript, */*; q=0.01");

    headerList.forEach(function (item) {
      
      headers = headers.append(item.Key, item.value);
    })

    
    const url = environment.apiURLForLogin + serviceName;
    return this.httpClient.post(url, data, { headers }).pipe(catchError(this.handleError));
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
  };
}