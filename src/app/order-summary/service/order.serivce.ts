import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { API_URL_ORDER, API_URL_RL } from '../../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class OrderSerivce {
    private apiUrl: string = API_URL_ORDER + '/orders';

    constructor(private http: HttpClient) { }
 
    saveOrder(data : any): Observable<any> {
        return this.http.post<any>(this.apiUrl, data)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: any) {
        console.error('An error occurred:', error);
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }
}

