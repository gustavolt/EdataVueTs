import api from '../helpers/api.service';
import endpoints from '../models/api/api.endpoints';

interface ClientData {
  id: number;
  name: string;
  lastName: string;
  cpf: string;
  email: string;
  birthDate: string;
}

export default {
  async updateClient(
    clientId: number,
    name: string,
    lastName: string,
    cpf: string,
    email: string,
    birthDate: string
  ): Promise<any> {
    const data: ClientData = {
      id: clientId,
      name,
      lastName,
      cpf,
      email,
      birthDate,
    };

    const url = `${endpoints.Data_SendData}/${clientId}`;
    const result = await api.put(url, {body : data , anonymous : false});
    return result;
  },

  async deleteClient(clientId: number): Promise<any> {
    const url = `${endpoints.Data_SendData}/${clientId}`;
    const result = await api.delete(url,  {anonymous : false});
    return result;
  },

  async getClients(): Promise<any> {
    const url = `${endpoints.Data_GetData}`;
    const result = await api.get(url, {anonymous : false});
    return result;
  },

  async getClientById(clientId: number): Promise<any> {
    const url = `${endpoints.Data_GetData}/${clientId}`;
    const result = await api.get(url, {anonymous : false});
    return result;
  },
};
