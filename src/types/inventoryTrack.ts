import {Order} from '../enums/order.enum';
import {OrderItemStatus} from '../enums/orderItemStatus';
import {PurchaseItemStatus} from '../enums/purchase';
import {Imeta} from './common/common';
import {Store} from './item';
import {OrderItem} from './projectOrder';
import {PurchaseItem} from './purchase';

interface InventoryTrackQueryParams {
  search?: string;
  page?: number;
  take?: number;
  sort?: string;
  order?: Order;
  startDate?: string;
  endDate?: string;
}

interface InventoryTrackData {
  id: number;
  updatedat: Date;
  name: string;
  quantity: number;
  totalPrice: number;
  barcode: string;
  unit: string;
  storename: string;
  storeid: number;
  parentId: number;
  fullfilled: boolean;
  type: 'purchase' | 'order' | 'move';
  status: OrderItemStatus | PurchaseItemStatus;
}
interface InventoryTrackResponse {
  data: InventoryTrackData[];
  meta: Imeta;
  dataCount: number;
  orderBy: {sort: string; order: Order};
  inventoryStartDate: Date;
}

export type {
  InventoryTrackResponse,
  InventoryTrackQueryParams,
  InventoryTrackData,
};
