import {Order} from '../enums/order.enum';
import {OrderStatus} from '../enums/orderStatus';
import {Common, Imeta} from './common/common';
import {Item} from './ItemsQuery';
import {Project} from './projectsQuery';

interface ProjectOrder extends Common {
  orderItems: OrderItem[];
  project: Project;
  totalItems: number;
  totalPrice: number;
  status: OrderStatus;
}

interface OrderItem extends Common {
  id?: number;
  itemId: number;
  name: string;
  barcode: string;
  unit: string;
  pricePerUnit?: number;
  quantity: number;
  totalPrice?: number;
  orderId?: number;
  itemAtStock?: number;
}

interface AddOrderDto {
  orderItems: OrderItem[];
  projectId: number | null;
  totalItems: number;
  totalPrice: number;
  status: OrderStatus;
}

interface OrderQueryResponse {
  orders: ProjectOrder[];
  meta: Imeta;
  orderBy: {sort: string; order: Order};
  orderStatus: OrderStatus;
}

interface OrdersQueryParams {
  search?: string;
  page?: number;
  take?: number;
  sort?: string;
  order?: Order;
  orderStatus?: OrderStatus;
}

export type {
  OrderQueryResponse,
  AddOrderDto,
  Order,
  OrderItem,
  OrdersQueryParams,
  ProjectOrder,
};
