import loginRepository from "../repository/login.repository";
import { IServiceResponse, getServiceResponse } from "../models/service.response";
import { ServiceResponseCode } from "../models/service.response.code";
import userService from "../helpers/user.service";

export async function Login(login: string, password: string): Promise<IServiceResponse> {
    try {
        const result = await loginRepository.Login(login, password);

        if (!result.error) {
            userService.saveUser(result);
        } else if (userService.getUser()) {
            userService.destroyUser();
        }

        return getServiceResponse(result);
    } catch (e) {
        return {
            Code: ServiceResponseCode.CatchAPICall,
            Title: "Error",
            Message: e.message,
            Success: false,
            Warning: false
        };
    }
}

export async function Logoff(): Promise<IServiceResponse> {
    try {
        userService.destroyUser();
        return {
            Code: 0,
            Title: "Success",
            Message: 'Ok',
            Success: true,
            Warning: false
        };
    } catch (e) {
        return {
            Code: ServiceResponseCode.CatchAPICall,
            Title: "Error",
            Message: e.message,
            Success: false,
            Warning: false
        };
    }
}