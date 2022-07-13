export interface standardHttpResponseInterface {
  httpCode: number;
  body?: unknown;
  session?: Record<string, unknown>;
  cookies?: Record<string, unknown>;
  options?: {
    unsetCookies?: string[];
  };
}
