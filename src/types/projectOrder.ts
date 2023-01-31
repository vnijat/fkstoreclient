import {Order} from '../enums/order.enum';
import {OrderItemStatus} from '../enums/orderItemStatus';
import {OrderStatus} from '../enums/orderStatus';
import {Common, Imeta} from './common/common';
import {Project} from './project';

interface ProjectOrder extends Common {
  orderItems: OrderItem[];
  project: Project;
  detail?: string;
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
  quantity?: number;
  totalPrice?: number;
  orderId?: number;
  projectId?: number | null;
  project?: Project;
  itemAtStock?: number;
  fullfilled?: boolean;
  status?: OrderItemStatus;
}

interface AddOrderDto {
  id?: number;
  orderItems?: OrderItem[];
  detail?: string;
  status?: OrderStatus;
}

interface OrderQueryResponse {
  orders: ProjectOrder[];
  meta: Imeta;
  ordersCount: number;
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
