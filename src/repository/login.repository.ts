import api from "../helpers/api.service";
import endpoints from "../models/api/api.endpoints";
import { ApiResponse } from "../models/api/api.models";

export default {
    async Login(login: string, password: string): Promise<ApiResponse> {
        const data = {
            email: login,
            password: password
        }

        const loginResult = await api.login(endpoints.Login_Login, data);
        return loginResult;
    },
}