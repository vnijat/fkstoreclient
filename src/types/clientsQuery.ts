import {ClientSort} from '../enums/clientSort';
import {Order} from '../enums/order.enum';

export interface ClientsQueryParams {
  page?: number;
  search?: string;
  take?: number;
  sort?: ClientSort;
  order?: Order;
}
