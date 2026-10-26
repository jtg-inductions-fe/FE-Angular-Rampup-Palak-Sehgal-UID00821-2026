export const ERROR_MESSAGES = {
  UNEXPECTED: 'An unexpected error occurred',
  NETWORK_ERROR: 'Network Error',
  UNAUTHORIZED: 'Session expired or unauthorized request. Logging out...',
  FORBIDDEN: `You don't have the permission to access this resource`,
  SERVER_ERROR: 'Server is currently unavailable.',
  NOT_FOUND: 'File not found',
};

export enum HttpStatus {
  networkError = 0,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  internalServerError = 500,
}

export const HTTP_ERROR_MAP: Record<number, string> = {
  [HttpStatus.networkError]: ERROR_MESSAGES.NETWORK_ERROR,
  [HttpStatus.unauthorized]: ERROR_MESSAGES.UNAUTHORIZED,
  [HttpStatus.forbidden]: ERROR_MESSAGES.FORBIDDEN,
  [HttpStatus.notFound]: ERROR_MESSAGES.NOT_FOUND,
  [HttpStatus.internalServerError]: ERROR_MESSAGES.SERVER_ERROR,
};
