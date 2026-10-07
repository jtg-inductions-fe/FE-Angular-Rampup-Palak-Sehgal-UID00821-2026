import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryParams } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  protected readonly http = inject(HttpClient);
  protected readonly baseUrl = environment.apiUrl;

  //get default headers for all apis
  private get defaultHeaders(): HttpHeaders {
    return new HttpHeaders().set('Content-Type', 'application/json');
  }

  private buildUrl(endpoint: string): string {
    const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${this.baseUrl}${formattedEndpoint}`;
  }

  //format url parameters
  private buildParams(params?: QueryParams): HttpParams {
    let httpParams = new HttpParams();
    if (!params) {
      return httpParams;
    }

    Object.keys(params).forEach(key => {
      const value = params[key];
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    });
    return httpParams;
  }

  //base get method
  protected get<T>(endpoint: string, queryParams?: QueryParams): Observable<T> {
    const params = this.buildParams(queryParams);
    return this.http.get<T>(this.buildUrl(endpoint), {
      headers: this.defaultHeaders,
      params,
    });
  }

  //base post method
  protected post<T>(endpoint: string, body: unknown): Observable<T> {
    return this.http.post<T>(this.buildUrl(endpoint), body, {
      headers: this.defaultHeaders,
    });
  }

  //base put method
  protected put<T>(endpoint: string, body: unknown): Observable<T> {
    return this.http.put<T>(this.buildUrl(endpoint), body, {
      headers: this.defaultHeaders,
    });
  }

  //base delete method
  protected delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(this.buildUrl(endpoint), {
      headers: this.defaultHeaders,
    });
  }
}
