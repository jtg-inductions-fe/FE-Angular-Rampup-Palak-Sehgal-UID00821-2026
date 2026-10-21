import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { map, Observable, startWith } from 'rxjs';

import { Article } from '@core/models';
import { ArticleTagComponent } from '@src/app/shared/components/article-tag/article-tag';
@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [AsyncPipe, DatePipe, RouterLink, MatButtonModule, MatIconModule, ArticleTagComponent],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss',
})
export class ArticleDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);

  articleState$!: Observable<{ isLoading: boolean; article: Article | null }>;
  isLoading = true;

  ngOnInit(): void {
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
