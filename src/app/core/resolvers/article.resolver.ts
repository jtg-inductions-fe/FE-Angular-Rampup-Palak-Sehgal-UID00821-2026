import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ArticleService } from '../services/article-service';

export const articleResolver: ResolveFn<unknown> = route => {
  const articleService = inject(ArticleService);
  const id = route.paramMap.get('id') || '1';

  return articleService.getArticleById(id).pipe(
    catchError(error => {
      console.error('Error in articleResolver:', error);
      return of(null);
    })
  );
};
