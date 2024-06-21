import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { forkJoin } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private baseUrl = 'http://localhost:5240/api/Store';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<any>(`${this.baseUrl}/ProductListing`, this.httpOptions).pipe(
      tap(response => {
        return response;
      }),
      catchError(error => {

        return throwError(error);
      })
    );
  }

  addProduct(product: Product): Observable<any> {
    console.log(product);
    return this.http.post<any>(`${this.baseUrl}/AddProduct`, product, this.httpOptions).pipe(
      tap(response => {
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }


  getProductTypes(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ProductTypes`, this.httpOptions).pipe(
      tap(response => {
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getBrands(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Brands`, this.httpOptions).pipe(
      tap(response => {
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getProduct(productId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Product/${productId}`, this.httpOptions).pipe(
      tap(response => {
        console.log(response);
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
