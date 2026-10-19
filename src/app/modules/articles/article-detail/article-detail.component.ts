import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { map, Observable } from 'rxjs';

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

  article$!: Observable<Article>;

  ngOnInit(): void {
    this.article$ = this.route.data.pipe(map(data => data['articleData']));
  }
}
