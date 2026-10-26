import { HttpErrorResponse } from '@angular/common/http';

export function isHttpError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;

  if (error instanceof HttpErrorResponse) return true;

  const err = error as Record<string, unknown>;

  if (err['name'] === 'HttpErrorResponse' || ('status' in err && 'headers' in err)) {
    return true;
  }
  return false;
}

export function extractMessage(item: unknown): string {
  if (!item) return '';
  if (typeof item === 'string') return item;

  if (Array.isArray(item)) {
    const msgs = item.map(extractMessage).filter(Boolean);
    return msgs.length > 0 ? msgs.join(', ') : '';
  }

  if (typeof item === 'object') {
    const obj = item as Record<string, unknown>;

    const msg = obj['msg'] || obj['message'] || obj['error'] || obj['errors'];
    if (typeof msg === 'string' && msg !== 'Validation failed') return msg;

    return Object.values(obj).map(extractMessage).filter(Boolean).join(', ') || '';
  }

  return '';
}
