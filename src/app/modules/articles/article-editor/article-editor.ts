import { Component, inject, Output, signal, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipsModule, MatChipInputEvent } from '@angular/material/chips';
import { QuillModule } from 'ngx-quill';

import { ArticleService } from '@modules/articles/article.service';
import { NotificationService } from '@shared/services/notification.service';
import { TextInputComponent } from '@shared/components/text-input/text-input.component';

@Component({
  selector: 'app-article-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    QuillModule,
    MatChipsModule,
    TextInputComponent,
  ],
  templateUrl: './article-editor.html',
  styleUrls: ['./article-editor.scss'],
})
export class ArticleEditor {
  private fb = inject(FormBuilder);
  articleForm: FormGroup;
  featureImage = signal<string | null>(null);
  @Output() closeDrawer = new EventEmitter<void>();
  articleService = inject(ArticleService);
  notificationService = inject(NotificationService);
  tags = signal<string[]>([]);
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  @Output() articleCreated = new EventEmitter<void>();

  constructor() {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(50)]],
      shortDescription: [''],
      tags: [[], Validators.required],
    });
  }
  get title(): FormControl {
    return this.articleForm.get('title') as FormControl;
  }
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.featureImage.set(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  extractShortDescription(htmlData: string, maxLength = 200): string {
    if (!htmlData) return '';

    const doc = new DOMParser().parseFromString(htmlData, 'text/html');
    let plainText = doc.body.textContent || '';
    plainText = plainText
      .replace(/\u00a0/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (plainText.length > maxLength) {
      return plainText.substring(0, maxLength).trim() + '...';
    }

    return plainText.trim();
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.update(currentTags => [...currentTags, value]);
      this.articleForm.patchValue({ tags: this.tags() });
    }
    event.chipInput!.clear();
  }

  removeTag(tagToRemove: string): void {
    this.tags.update(currentTags => currentTags.filter(tag => tag !== tagToRemove));
    this.articleForm.patchValue({ tags: this.tags() });
  }

  onSubmit() {
    if (this.articleForm.invalid) return;
    const content = this.articleForm.get('description')?.value;
    const shortDesc = this.extractShortDescription(content, 197);
    const finalArticleData = {
      ...this.articleForm.value,
      shortDescription: shortDesc,
      image: this.featureImage(),
    };
    this.articleService.createArticle(finalArticleData).subscribe({
      next: response => {
        this.notificationService.showNotification(response.message);
        this.articleForm.reset();
        this.tags.set([]);
        this.featureImage.set(null);

        this.articleCreated.emit();

        this.closeDrawer.emit();
      },
      error: err => {
        const errorMessage = err.error?.message || 'An error occurred while creating the article';
        this.notificationService.showNotification(errorMessage);
      },
    });
  }
}
