import dataRepository from "../repository/data.repository";
import { IServiceResponse, getServiceResponse } from "../models/service.response";
import { ServiceResponseCode } from "../models/service.response.code";

export default {
  async getClients(): Promise<IServiceResponse> {
    try {
      const result = await dataRepository.getClients();
      return getServiceResponse(result);
    } catch (e) {
      return {
        Code: ServiceResponseCode.CatchAPICall,
        Title: 'Error',
        Message: e.message,
        Success: false,
        Warning: false,
      };
    }
  },

  async deleteClient(clientId: number): Promise<IServiceResponse> {
    try {
      const result = await dataRepository.deleteClient(clientId);
      return getServiceResponse(result);
    } catch (e) {
      return {
        Code: ServiceResponseCode.CatchAPICall,
        Title: 'Error',
        Message: e.message,
        Success: false,
        Warning: false,
      };
    }
  },
};
