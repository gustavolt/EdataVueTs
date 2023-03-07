import baseAPIService from './base.api.service';

interface RequestOptions {
  body?: any;
  anonymous?: boolean;
}

export default {
  login: async (url: string, body: any): Promise<any> => {
    return baseAPIService.executeAnonymousMethod(url, 'POST', body);
  },

  get: async (url: string, options?: RequestOptions): Promise<any> => {
    const { anonymous = false } = options || {};
    return anonymous
      ? baseAPIService.executeAnonymousMethod(url, 'GET', undefined)
      : baseAPIService.executeTokenMethod(url, 'GET', undefined);
  },

  getExternal: async (url: string): Promise<any> => {
    return baseAPIService.executeExternalMethod(url);
  },

  post: async (url: string, options?: RequestOptions): Promise<any> => {
    const { body = undefined, anonymous = false } = options || {};
    return anonymous
      ? baseAPIService.executeAnonymousMethod(url, 'POST', body)
      : baseAPIService.executeTokenMethod(url, 'POST', body);
  },

  put: async (url: string, options?: RequestOptions): Promise<any> => {
    const { body = undefined, anonymous = false } = options || {};
    return anonymous
      ? baseAPIService.executeAnonymousMethod(url, 'PUT', undefined)
      : baseAPIService.executeTokenMethod(url, 'PUT', body);
  },

  delete: async (url: string, options?: RequestOptions): Promise<any> => {
    const { anonymous = false } = options || {};
    return anonymous
      ? baseAPIService.executeAnonymousMethod(url, 'DELETE', undefined)
      : baseAPIService.executeTokenMethod(url, 'DELETE', undefined);
  },
};