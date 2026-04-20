import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { API_URL_RL } from "../../config/api.config";

@Injectable({
    providedIn: 'root'
})

export class RestaurantService {
    private apiUrl: string = API_URL_RL + '/restaurants';

    constructor(private http: HttpClient) { }
 
    getAllRestaurants(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}`)
            .pipe(
                catchError(this.handleError)
            ); 
    }

    private handleError(error: any) {
        console.error('An error occurred:', error);
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }
}