import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';

import { DashboardRoutingModule } from './dashboard-routing-module';
import { Dashboard } from './dashboard';
import { ArticleCard } from '@shared/components/article-card/article-card';
import { ArticleTagComponent } from '@src/app/shared/components/article-tag/article-tag';
import { ArticleEditor } from '@modules/articles/article-editor/article-editor';
import { FloatingButton } from '@src/app/shared/components/floating-button/floating-button';

@NgModule({
  declarations: [Dashboard, ArticleCard],
  imports: [CommonModule, DashboardRoutingModule, ArticleTagComponent, MatSidenavModule, ArticleEditor, FloatingButton],
})
export class DashboardModule {}
