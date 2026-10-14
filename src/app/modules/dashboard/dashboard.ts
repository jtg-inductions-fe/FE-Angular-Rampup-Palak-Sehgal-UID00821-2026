import { Component, inject, OnInit } from '@angular/core';
import { ArticleService } from '@core/services/article.service';
import { map, Observable } from 'rxjs';
import { Article, ArticleListResponse } from '@core/models';
@Component({
  selector: 'app-dashboard',
  standalone: false,
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  private articleService = inject(ArticleService);
  articles$!: Observable<Article[]>;
  ngOnInit(): void {
    this.articles$ = this.articleService
      .getArticles()
      .pipe(map((response: ArticleListResponse) => response.data?.data || []));
  }
}
