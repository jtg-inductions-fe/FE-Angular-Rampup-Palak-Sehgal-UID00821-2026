import { Component, input } from '@angular/core';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [JsonPipe],
  template: `
    <div style="padding: 2rem;">
      <h2>Article Detail (Resolver Test Page)</h2>

      @if (articleData()) {
        <h3>Raw API Data Received via Resolver:</h3>
        <pre style="background: #f4f4f4; padding: 1rem; border-radius: 6px;">{{
          articleData() | json
        }}</pre>
      } @else {
        <p style="color: red;">No article data found (API call failed or empty response).</p>
      }
    </div>
  `,
})
export class ArticleDetailComponent {
  articleData = input<unknown>();
}
