import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';
import { Article, ArticleListResponse, ArticleQueryParams, CreateArticleRequest } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ArticleService extends BaseApiService {
  private readonly endpoint = 'articles';

  //get article whose id is passed
  getArticleById(id: string): Observable<Article> {
    return this.get<Article>(`${this.endpoint}/${id}`);
  }
  // list of articles
  getArticles(params?: ArticleQueryParams): Observable<ArticleListResponse> {
    return this.get<ArticleListResponse>(this.endpoint, params);
  }
  //create new article
  createArticle(body: CreateArticleRequest): Observable<Article> {
    return this.post<Article>(this.endpoint, body);
  }
  //update existing article
  updateArticle(id: string, body: Article): Observable<Article> {
    return this.put<Article>(`${this.endpoint}/${id}`, body);
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
