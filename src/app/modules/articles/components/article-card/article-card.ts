import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Article } from '@core/models';

@Component({
  selector: 'app-article-card',
  standalone: false,
  styleUrl: './article-card.scss',
  templateUrl: './article-card.html',
})
export class ArticleCard {
  @Input() article!: Article;
  @Output() edit = new EventEmitter<Article>();

  onEdit(event: Event) {
    event.stopPropagation();
    this.edit.emit(this.article);
  }
}
