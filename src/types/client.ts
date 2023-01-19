import {ClientSort} from '../enums/clientSort';
import {ClientType} from '../enums/clientType';
import {Order} from '../enums/order.enum';
import {Common, Imeta} from './common/common';
interface AddClient {
  id?: number;
  companyName?: string;
  firstName?: string;
  lastName?: string;
  type: ClientType;
  email?: string;
  phone?: string;
}
interface ClientsQueryParams {
  page?: number;
  search?: string;
  type?: ClientType & 'all';
  take?: number;
  sort?: ClientSort;
  order?: Order;
}

interface Client extends Common {
  companyName: string;
  firstName: string;
  lastName: string;
  description: string;
  phone: string;
  email: string;
  type: ClientType;
  projectsInProgress: number;
  projectsDeclined: number;
  projectsCompleted: number;
  totalProjects: number;
  projects: [];
}

interface ClientsResponse {
  clients: Client[];
  type: ClientType | 'all';
  meta: Imeta;
  clientsCount: number;
  orderBy: {sort: ClientSort; order: Order};
}

export type {ClientsQueryParams, Client, ClientsResponse, AddClient};
