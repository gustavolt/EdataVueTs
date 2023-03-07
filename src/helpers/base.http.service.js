import helperService from './helper.service'
import APIError from '../models/api/api.error';

const BASE_URL = process.env.ROOT_API;
const API_VERSION = process.env.API_VERSION;
 
const module = "HttpRequestModule";
const currentFile = "base.http.service";

export default {
    executeAPI : async(url, method, body, headers) => {
        url = BASE_URL + API_VERSION + url;
        return fetch(url, {
            method: method,
            headers: headers,
            timeut: 60,
            body: body ? JSON.stringify(body) : undefined
        }).then(response => {
            return helperService.getHttpErrror(response).then(responseError => {
                if(responseError) {
                    throw new APIError(responseError.error, responseError);
                } else {
                    return response.json();
                }
            })
        }).then(responseJson => {
            return responseJson;
        }).catch(error => {
            console.log(error);
            throw error;
        })
    },
    execute : async(url, method, body, headers) => {
        return fetch(url, {
            method: method,
            headers: headers,     
            timeut: 60,   
            body: body ? JSON.stringify(body) : undefined
        }).then(response => { 
            return helperService.getHttpErrror(response).then(responseError => {
                if(responseError) {
                    throw new APIError(responseError.Message, responseError);
                } else {
                    return response.json();
                }
            })
        }).then(responseJson => {
            return responseJson;
        }).catch(error => {
            console.log(error);
            throw error;
        })
    },
    executeExternal : async(url, method, headers) => {
        return fetch(url, {
            method: method,
            headers: headers,     
            timeut: 60,   
        }).then(response => { 
            return helperService.getHttpErrror(response).then(responseError => {
                if(responseError) {
                    throw new APIError(responseError.Message, responseError);
                } else {
                    return response.json();
                }
            })
        }).then(responseJson => {
            return responseJson;
        }).catch(error => {
            console.log(error);
            throw error;
        })
    }
};