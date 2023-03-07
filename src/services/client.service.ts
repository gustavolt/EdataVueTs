import dataRepository from "../repository/data.repository";
// import Helper from "../helpers/helper.service";
import { IServiceResponse, getServiceResponse } from "../models/service.response";
import { ServiceResponseCode } from "../models/service.response.code";

export default {
    async updateClient(clientId: number, name: string, lastName: string, cpf: string, email: string, birthDate: string): Promise<IServiceResponse> {
        try {
            const result = await dataRepository.updateClient(clientId, name, lastName, cpf, email, birthDate);    
            return getServiceResponse(result);
        } catch(e) {    
            return {
                Code: ServiceResponseCode.CatchAPICall,
                Title: "Error",
                Message: e.message,
                Success: false,
                Warning: false
            };
        }
    },
    async getClientById(clientId: number): Promise<IServiceResponse> {
        try {
            const result = await dataRepository.getClientById(clientId);    
            return getServiceResponse(result);
        } catch(e) {    
            return {
                Code: ServiceResponseCode.CatchAPICall,
                Title: "Error",
                Message: e.message,
                Success: false,
                Warning: false
            };
        }
    },
}
