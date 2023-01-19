import {Order} from '../enums/order.enum';
import {Common, Imeta} from './common/common';
interface AddItemInterface {
  id?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  name: string;
  code?: string;
  description?: string;
  pricePerUnit?: string;
  quantity?: string;
  unitId?: string;
  supplierId?: string;
  categoryId?: string;
  locationId?: string;
  labelId?: string;
  storeId?: string;
  colorId?: string;
}

interface ItemQueryParams {
  page?: number;
  search?: string;
  take?: number;
  categoryId?: string;
  supplierId?: string;
  unitId?: string;
  locationId?: string;
  storeId?: string;
  labelId?: string;
  colorId?: string;
  sort?: string;
  order?: Order;
  outOfStock?: boolean;
}

type QueryFilterByParam = Omit<
  ItemQueryParams,
  'page' | 'search' | 'take' | 'sort' | 'order' | 'outOfStock'
>;

type FilterParamskey = keyof QueryFilterByParam;

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

interface Label extends Common {
  name: string;
  skuCode: string;
}

interface Item extends Common {
  name: string;
  description: string;
  pricePerUnit: number;
  quantity: number;
  code: string;
  barcode: string;
  unit: Unit;
  supplier: Supplier;
  category: Category;
  location: Location;
  store: Store;
  color: Color;
  totalPrice: number;
  outOfStock: boolean;
  label: Label;
  inUse: boolean;
}

interface ItemResponseFull extends Omit<Item, 'category'> {
  qrCode: Buffer;
  category: 'string';
}

interface ItemResponse {
  items: Item[];
  itemsCount: number;
  meta: Imeta;
  orderBy: {sort: string; order: Order};
  sumTotal: number;
  outOfStock?: boolean;
}

export type {
  ItemQueryParams,
  ItemResponse,
  Item,
  QueryFilterByParam,
  FilterParamskey,
  Unit,
  Barcode,
  Color,
  Category,
  ItemResponseFull,
  AddItemInterface,
};
