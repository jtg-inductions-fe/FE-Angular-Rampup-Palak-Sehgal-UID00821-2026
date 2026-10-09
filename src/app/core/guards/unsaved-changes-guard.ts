import { CanDeactivateFn } from '@angular/router';

export interface HasUnsavedChanges {
  hasUnsavedChanges: () => boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges> = component => {
  if (component?.hasUnsavedChanges && component.hasUnsavedChanges()) {
    return window.confirm('You have unsaved changes. Do you want to leave them?');
  }
  return true;
};
