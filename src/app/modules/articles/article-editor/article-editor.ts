import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-article-editor',
  standalone: true,
  imports: [ReactiveFormsModule, MatSidenavModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, QuillModule],
  templateUrl: './article-editor.html',
  styleUrls: ['./article-editor.scss'],
})
export class ArticleEditor {
  private fb = inject(FormBuilder);
  articleForm: FormGroup;
  featureImage = signal<string | null>(null);
  isDrawerOpen = signal(false);
  constructor() {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      shortDescription: [''],
    });
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

  toggleDrawer() {
    this.isDrawerOpen.set(!this.isDrawerOpen());
  }

  onSubmit() {
    if (this.articleForm.invalid) return false;
    const finalArticleData = {
      ...this.articleForm.value,
      featureImage: this.featureImage(),
    };
    console.log(finalArticleData);
    this.toggleDrawer();
    return null;
  }
}
