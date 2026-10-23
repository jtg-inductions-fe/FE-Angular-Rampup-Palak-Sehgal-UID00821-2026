import { HttpErrorResponse } from '@angular/common/http';

export function isHttpError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;

  if (error instanceof HttpErrorResponse) return true;

  const err = error as Record<string, unknown>;

  if (err['name'] === 'HttpErrorResponse' || ('status' in err && 'headers' in err)) {
    return true;
  }
  return false;
  // return ('rejection' in err && isHttpError(err['rejection'])) || ('cause' in err && isHttpError(err['cause'])) || false;
}

export function extractMessage(item: unknown): string | null {
  if (!item) return '';
  if (typeof item === 'string') return item;

  if (Array.isArray(item)) {
    const msgs = item.map(extractMessage).filter(Boolean);
    return msgs.length > 0 ? msgs.join(', ') : '';
  }

  if (typeof item === 'object') {
    const obj = item as Record<string, unknown>;

    if (typeof obj['msg'] === 'string') return obj['msg'];
    if (typeof obj['message'] === 'string' && obj['message'] !== 'Validation failed') {
      return obj['message'];
    }

    const values = Object.values(obj).map(extractMessage).filter(Boolean);
    return values.length > 0 ? values.join(', ') : null;
  }

  return null;
}
