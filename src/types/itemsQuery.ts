interface QueryParams {
  limit?: number;
  offset?: number;
  barcode?: string;
  category?: string;
}

interface Common {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  skuCode?: string;
}

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
  photoPath?: string;
  location: Location;
  store: Store;
}

interface Data<T> {
  items: T[];
  itemsCount: number;
}

export type {QueryParams, Data, Item};
