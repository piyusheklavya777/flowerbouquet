export interface standardHttpResponseInterface {
    httpCode: number,
    body?: {},
    session?: {},
    cookies?: {},
    options?: {
      unsetCookies?: string[],
    }
  }