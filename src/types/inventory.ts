import {Order} from '../enums/order.enum';
import {OrderItemStatus} from '../enums/orderItemStatus';
import {PurchaseItemStatus} from '../enums/purchase';
import {Common, Imeta} from './common/common';
import {Item, Store} from './item';
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
  projectcode: string;
  type: 'purchase' | 'order' | 'move';
  status: OrderItemStatus | PurchaseItemStatus;
}

interface InventoryTransfersParams extends InventoryTrackQueryParams {
  storeId?: string;
}
interface InventoryTrackResponse {
  data: InventoryTrackData[];
  meta: Imeta;
  dataCount: number;
  orderBy: {sort: string; order: Order;};
  inventoryStartDate: Date;
}

interface InventoryTransfers extends Common {
  quantity: number;
  originalStore: Store;
  destinationStore: Store;
  transferedFromItem: Item;
  transferedFromItemId: number;
  transferedToItem: Item;
  transferedToItemId: number;
  generatedItem: Item;
  generatedItemId: number;
}


interface InventoryTransfersResponse {
  data: InventoryTransfers[];
  meta: Imeta;
  dataCount: number;
  orderBy: {sort: string; order: Order;};
  transfersStartDate: Date;
}

export type {
  InventoryTrackResponse,
  InventoryTrackQueryParams,
  InventoryTrackData,
  InventoryTransfers,
  InventoryTransfersResponse,
  InventoryTransfersParams
};
