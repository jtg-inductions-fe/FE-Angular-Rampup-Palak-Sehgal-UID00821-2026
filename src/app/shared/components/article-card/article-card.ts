import { Component, Input } from '@angular/core';
import { Article } from '../../../core/models';

@Component({
  selector: 'app-article-card',
  standalone: false,
  styleUrl: './article-card.scss',
  templateUrl: './article-card.html',
})
export class ArticleCard {
  @Input() article!: Article;
}
