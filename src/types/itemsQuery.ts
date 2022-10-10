import {Order} from '../enums/order.enum';
import {Common, Imeta} from './common/common';

interface itemQueryParams {
  page?: number;
  search?: string;
  take?: number;
  barcodeId?: string;
  categoryId?: string;
  supplierId?: string;
  unitId?: string;
  locationId?: string;
  storeId?: string;
  labelId?: string;
  colorId?: string;
  sort?: string;
  order?: Order;
}

type queryFilterByParam = Omit<
itemQueryParams,
  'page' | 'search' | 'take' | 'sort' | 'order'
>;

type FilterParamskey = keyof queryFilterByParam;

interface Supplier extends Common {
  name: string;
  address?: string;
  phone?: string;
  email?: string;
}

interface Barcode extends Common {
  code: string;
}

interface Category extends Common {
  title: string;
  photoName?: string;
}

interface Unit extends Common {
  name: string;
  symbol: string;
}

interface Location extends Common {
  code: string;
}

interface Store extends Common {
  name: string;
  description?: string;
  address?: string;
  phone?: string;
}

interface Color extends Common {
  name: string;
  items?: Item[];
}

interface Item {
  id: number;
  name: string;
  description: string;
  purchasePrice: number;
  pricePerUnit: number;
  quantity: number;
  unit: Unit;
  supplier: Supplier;
  createdAt: Date;
  updatedAt: Date;
  barcode: Barcode;
  category: Category;
  location: Location;
  store: Store;
  color: Color;
  totalPrice: number;
}

interface ItemResponse {
  items: Item[];
  itemsCount: number;
  meta: Imeta;
}

export type {
  itemQueryParams,
  ItemResponse,
  Item,
  queryFilterByParam,
  FilterParamskey,
};
