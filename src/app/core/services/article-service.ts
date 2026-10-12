import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService extends BaseApiService {
  getArticleById(id: string): Observable<unknown> {
    return this.get<unknown>(`articles/${id}`);
  }
}
