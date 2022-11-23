import {ClientType} from '../enums/clientType';
import {Order} from '../enums/order.enum';
import {PaymentStatus} from '../enums/paymentStatus';
import {ProjectStatus} from '../enums/projectStatus';
import {Client} from './clientsQuery';
import {Common, Imeta} from './common/common';

interface Project extends Common {
  title: string;
  description: string | null;
  status: ProjectStatus;
  price: number;
  paid: number;
  deadline: Date | null;
  client: Client;
  otherExpenses: OtherExpensesType[];
  otherExpensesTotalCost: number;
  paymentStatus: PaymentStatus;
}

type OtherExpensesType = {
  title: string;
  description?: string;
  cost: number;
};

interface ProjectsQueryParams {
  search?: string;
  clientType?: ClientType;
  page?: number;
  take?: number;
  sort?: string;
  order?: Order;
  clientId?: number;
}

interface ProjectsResponse {
  projects: Project[];
  meta: Imeta;
  projectsCount: number;
  orderBy: {sort: string; order: Order};
  clientType: ClientType | 'all';
  clientId: number;
}

export type {Project, ProjectsQueryParams, ProjectsResponse, OtherExpensesType};
