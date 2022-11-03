import {ClientType} from '../enums/clientType';

interface AddClient {
  id?: number;
  companyName?: string;
  firstName?: string;
  lastName?: string;
  type: ClientType;
  email?: string;
  phone?: string;
}

export type {AddClient};
