import { Component, inject, OnInit } from '@angular/core';

import { catchError, EMPTY, map, Observable } from 'rxjs';

import { ArticleService } from '@modules/articles/article.service';
import { Article, ArticleListResponse } from '@core/models';
import { NotificationService } from '@shared/services/notification.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  private articleService = inject(ArticleService);
  articles$!: Observable<Article[]>;
  notificationService = inject(NotificationService);
  isLoading = false;
  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articles$ = this.articleService.getArticles().pipe(
      map((response: ArticleListResponse) => response.data?.data || []),
      catchError(error => {
        this.notificationService.showNotification(error);
        this.isLoading = false;
        return EMPTY;
      })
    );
  }
}
