import {
  areaMeasures,
  dimensionMeasures,
  volumeMeasures,
  weightMeasures,
} from '../enums/itemProperties';
import {Order} from '../enums/order.enum';
import {Common, Imeta} from './common/common';
import {InventoryTrackData} from './inventoryTrack';
import {OrderItem} from './projectOrder';
import {PurchaseItem} from './purchase';
interface AddItemInterface {
  id?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  name: string;
  code?: string;
  description?: string;
  costPrice?: string;
  sellPrice?: string;
  quantity?: string;
  unitId?: string;
  supplierId?: string;
  categoryId?: string;
  locationId?: string;
  labelId?: string;
  storeId?: string;
  colorId?: string;
  properties: ProductAttributesDto;
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

interface ItemOptionForInputs {
  category: optionsForInput[];
  unit: optionsForInput[];
  supplier: optionsForInput[];
  store: optionsForInput[];
  location: optionsForInput[];
  color: optionsForInput[];
  label: optionsForInput[];
}

type optionsForInput = {
  id: number;
  label: string | number;
  storeId?: number;
  nested?: optionsForInput[];
};

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
  costPrice: number;
  sellPrice: number;
  quantity: number;
  code: string;
  barcode: string;
  unit: Unit;
  supplier: Supplier;
  category: Category;
  location: Location;
  store: Store;
  color: Color;
  totalCostPrice: number;
  totalSellPrice: number;
  outOfStock: boolean;
  label: Label;
  inUse: boolean;
  properties: ProductAttributesDto;
}

interface ItemResponseFull extends Omit<Item, 'category'> {
  qrCode: Buffer;
  category: 'string';
  transactions: InventoryTrackData[];
}

interface ProductAttributesDto extends Common {
  height?: number;
  width?: number;
  length?: number;
  weight?: number;
  volume?: number;
  area?: number;
  areaMeasure?: areaMeasures;
  dimensionMeasure?: dimensionMeasures;
  weightMeasure?: weightMeasures;
  volumeMeasure?: volumeMeasures;
  supplierColorVariant?: string;
  supplierProductArticule?: string;
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
  ItemOptionForInputs,
  Supplier,
  Store,
  ProductAttributesDto,
};
