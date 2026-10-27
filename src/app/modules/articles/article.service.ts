import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { BaseApiService } from '@core/services/base-api.service';
import { ApiResponse, Article, ArticleListResponse, ArticleQueryParams, ArticleResponse, CreateArticleRequest } from '@core/models';
import { ENDPOINTS } from '@modules/constants/endpoints';

@Injectable({
  providedIn: 'root',
})
export class ArticleService extends BaseApiService {
  private readonly endpoint = ENDPOINTS['articles'];

  //get article whose id is passed
  getArticleById(id: string): Observable<Article> {
    return this.get<ArticleResponse>(`${this.endpoint}/${id}`).pipe(map(response => response.data as Article));
  }
  // list of articles
  getArticles(params?: ArticleQueryParams): Observable<ArticleListResponse> {
    return this.get<ArticleListResponse>(this.endpoint, params);
  }
  //create new article
  createArticle(body: CreateArticleRequest): Observable<ApiResponse> {
    return this.post<ApiResponse>(this.endpoint, body);
  }
  //update existing article
  updateArticle(id: string, body: Article): Observable<ApiResponse> {
    return this.put<ApiResponse>(`${this.endpoint}/${id}`, body);
  }
  //delete the article by given id
  deleteArticle(id: string): Observable<void> {
    return this.delete<void>(`${this.endpoint}/${id}`);
  }
  //get all the articles of the logged in user
  getMyArticles(): Observable<ArticleListResponse> {
    return this.get<ArticleListResponse>(`${this.endpoint}/my`);
  }
}
