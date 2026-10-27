import { Component, DOCUMENT, inject, OnInit, Renderer2 } from '@angular/core';

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

  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);

  isLoading = false;
  selectedArticle: Article | null = null;

  //hide the page scroll when drawer is open
  onDrawerChange(isOpen: boolean) {
    if (isOpen) {
      this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
    } else {
      this.renderer.removeStyle(this.document.body, 'overflow');
    }
  }

  onEditArticle(article: Article) {
    this.selectedArticle = article;
  }

  onCreateNew() {
    this.selectedArticle = null;
  }

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
