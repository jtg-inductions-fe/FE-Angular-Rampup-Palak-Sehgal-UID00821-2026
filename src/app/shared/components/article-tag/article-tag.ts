import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-article-tag',
  standalone: true,
  templateUrl: './article-tag.html',
  styleUrl: './article-tag.scss',
})
export class ArticleTagComponent {
  @Input({ required: true }) tag!: string;
}
