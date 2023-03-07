import userService from './user.service';
import baseHttpService from './base.http.service';
import {ServiceResponseCode} from '../models/service.response.code';
import APIError from '../models/api/api.error';
import Router from '../router';

export default {
  async executeTokenMethod(url: string, method: string, body: any) {
    try {
      const user = userService.getUser();

      if (!url || url == undefined || !method || method == undefined) {
        throw new Error('Necessário informar a url e o método.');
      }

      if (!user || !user.token) {
        Router.push('/autenticacao/login');
        throw new Error('Usuário não logado. Por favor efeturar o login.');
      }

      const result = await baseHttpService.executeAPI(url, method, body, {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      });

      if (!result.Success) {
        console.log(result);
      }

      return result;
    } catch (e) {
      if (e instanceof APIError) {
        if (!e.data.Success && e.data.Code == ServiceResponseCode.InactiveSession) {
          userService.destroyUser();
          Router.push('/autenticacao/login');
          throw new Error(e.data.Message);
        } else {
          throw e;
        }
      }
    }
  },

  async executeAnonymousMethod(url: string, method: string, body: any) {
    try {
      const result = await baseHttpService.executeAPI(url, method, body, {
        'Content-Type': 'application/json',
      });

      return result;
    } catch (e) {
      throw e;
    }
  },

  async executeExternalMethod(url: string) {
    try {
      const result = await baseHttpService.executeExternal(url, 'GET', {
        'Content-Type': 'application/json',
      });
      return result;
    } catch (e) {
        throw e;
      }
    }
};