import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { API_URL_FC } from "../../config/api.config";

@Injectable({
  providedIn: 'root',
})
export class FoodItemService {
      private apiUrl: string = API_URL_FC + '/food-items/catalogue/';

    constructor(private http: HttpClient) { }
 
    getFoodItemsByRestaurant(id:number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl + id}`)
            .pipe(
                catchError(this.handleError)
            ); 
    }

    private handleError(error: any) {
        console.error('An error occurred:', error);
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }
}
