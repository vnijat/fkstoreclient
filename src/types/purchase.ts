import {PaymentMethod, PurchaseStatus} from '../enums/purchase';
import {Common, Imeta} from './common/common';
import {Supplier} from './item';
import {Order} from './projectOrder';

interface AddPurchaseDto extends Common {
  poInfo?: string;
  purchaseItems?: PurchaseItem[];
  detail?: string;
  supplierId?: number;
  paymentMethod?: PaymentMethod;
  status?: PurchaseStatus;
}

interface PurchaseItem extends Common {
  unit: string;
  quantity: number;
  name: string;
  barcode: string;
  pricePerUnit: number;
  itemId: number;
  updateMainPrice: boolean;
  fullfilled: boolean;
  supplierId: number | null;
  paymentMethod?: PaymentMethod;
  poInfo?: string;
  supplier?: Supplier;
}

interface PurchaseDto extends Common {
  purchaseItems: PurchaseItem[];
  totalPrice: number;
  totalItems: number;
  detail: string;
  paymentMethod: PaymentMethod;
  poInfo: string;
  supplierId: number;
  status: PurchaseStatus;
}

interface PurchaseQueryResponse {
  purchases: PurchaseDto[];
  meta: Imeta;
  orderBy: {sort: string; order: Order};
  purchasesCount: number;
}

interface PurchaseQueryParams {
  search?: string;
  page?: number;
  take?: number;
  sort?: string;
  order?: Order;
}

export type {
  AddPurchaseDto,
  PurchaseQueryResponse,
  PurchaseQueryParams,
  PurchaseDto,
  PurchaseItem,
};
