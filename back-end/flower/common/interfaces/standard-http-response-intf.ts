export interface standardHttpResponseInterface {
  httpCode: number;
  body?: Record<string, unknown>;
  session?: Record<string, unknown>;
  cookies?: Record<string, unknown>;
  options?: {
    unsetCookies?: string[];
  };
}
