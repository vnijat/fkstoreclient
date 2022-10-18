import {ClientType} from '../enums/clientType';

interface AddClient {
  companyName?: string;
  firstName?: string;
  lastName?: string;
  type: ClientType;
  email?: string;
  phone?: string;
}

export type {AddClient};
