import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing-module';
import { Dashboard } from './dashboard';
import { ArticleCard } from '@shared/components/article-card/article-card';

@NgModule({
  declarations: [Dashboard, ArticleCard],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
