import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';

import { NotificationService } from '../services/notification.service';

export interface HasUnsavedChanges {
  hasUnsavedChanges: () => boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges> = component => {
  const notificationService = inject(NotificationService);
  if (component?.hasUnsavedChanges && component.hasUnsavedChanges()) {
    return notificationService.confirm({
      title: 'Warning',
      message: 'You have unsaved changes. Do you want to leave them?',
    });
  }
  return true;
};
