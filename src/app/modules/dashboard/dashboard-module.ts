import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing-module';
import { Dashboard } from './dashboard';
import { ArticleCard } from '@shared/components/article-card/article-card';
import { ArticleTagComponent } from '@src/app/shared/components/article-tag/article-tag';

@NgModule({
  declarations: [Dashboard, ArticleCard],
  imports: [CommonModule, DashboardRoutingModule, ArticleTagComponent],
})
export class DashboardModule {}
