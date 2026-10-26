import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { map, Observable, startWith } from 'rxjs';

import { TruncatePipe } from '@shared/pipe/truncate-pipe';
import { ReadingTimePipe } from '@shared/pipe/reading-time-pipe';
import { Article } from '@core/models';
import { ArticleTagComponent } from '@modules/articles/components/article-tag/article-tag';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [AsyncPipe, DatePipe, RouterLink, MatButtonModule, MatIconModule, ArticleTagComponent, TruncatePipe, ReadingTimePipe],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss',
})
export class ArticleDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);

  articleState$!: Observable<{ isLoading: boolean; article: Article | null }>;
  isLoading = true;

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles() {
    this.articleState$ = this.route.data.pipe(
      map(data => ({
        isLoading: false,
        article: data['articleData'],
      })),
      startWith({ isLoading: true, article: null })
    );
    this.isLoading = false;
  }
}
