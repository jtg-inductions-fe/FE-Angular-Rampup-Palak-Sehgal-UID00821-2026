import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ArticleCard } from './components/article-card/article-card';

@NgModule({
  imports: [CommonModule, ConfirmDialogComponent],
  exports: [CommonModule, ConfirmDialogComponent, ArticleCard],
  declarations: [ArticleCard],
})
export class SharedModule {}
