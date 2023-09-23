import {OrderItem} from './projectOrder';
import {ClientType} from '../enums/clientType';
import {Order} from '../enums/order.enum';
import {PaymentStatus} from '../enums/paymentStatus';
import {ProjectStatus} from '../enums/projectStatus';
import {Common, Imeta} from './common/common';
import {Client} from './client';

interface AddClientProject {
  title?: string;
  description?: string | null;
  price?: number | string;
  paid?: number | string;
  clientId?: number | string | null;
  deadline?: Date | null;
  isSample?: boolean;
  otherExpenses?: OtherExpensesType[];
  status: ProjectStatus;
  orders?: OrderItem[];
  typeId?: number | null;
}

interface IProjectsForPicker {
  value: number | string;
  label: string;
}

interface Project extends Common {
  id: number;
  projectCode: string;
  title: string;
  description: string | null;
  status: ProjectStatus;
  price: number;
  paid: number;
  deadline: Date | null;
  client: Client;
  otherExpenses: OtherExpensesType[];
  otherExpensesTotalCost: number;
  totalPrice: number;
  paymentStatus: PaymentStatus;
  isSample: boolean;
  unPaid: number;
  totalOrders: number;
  ordersTotalCost: number;
  totalExpenses: number;
  totalExpensesCost: number;
  orders?: OrderItem[];
  typeId: number | null;
  type: IProjectType;
}

interface OtherExpensesType extends Common {
  title: string;
  description?: string;
  cost: number;
}

interface IProjectType extends Common {
  title: string;
  prefix: string;
}

interface ProjectsQueryParams {
  search?: string;
  clientType?: ClientType;
  page?: number;
  take?: number;
  sort?: string;
  order?: Order;
  clientId?: number;
  projectType?: number | 'all';
  showDeleted?: boolean;
}

interface ProjectsResponse {
  projects: Project[];
  meta: Imeta;
  projectsCount: number;
  orderBy: {sort: string; order: Order;};
  clientType: ClientType | 'all';
  projectType: number | 'all';
  clientId: number;
  showDeleted: boolean;
}

export type {
  AddClientProject,
  IProjectsForPicker,
  Project,
  ProjectsQueryParams,
  ProjectsResponse,
  OtherExpensesType,
  IProjectType,
};
