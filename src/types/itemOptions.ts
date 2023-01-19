interface AddStore {
  name: string;
  description: string;
  address: string;
  phone: string;
}

interface AddSupplier {
  name: string;
  address: string;
  phone: string;
  email: string;
  country: string;
  skuCode: string;
}

interface AddLabel {
  name: string;
  skuCode: string;
}

interface AddLocation {
  title: string;
  storeId: number;
  skuCode: string;
}

interface AddColor {
  name: string;
  skuCode: string;
}

interface AddUnit {
  name: string;
  symbol: string;
  skuCode: string;
}

interface AddCategory {
  title: string;
  parentCategoryId: number;
  skuCode: string;
}

export type {
  AddColor,
  AddLabel,
  AddLocation,
  AddStore,
  AddSupplier,
  AddUnit,
  AddCategory,
};
