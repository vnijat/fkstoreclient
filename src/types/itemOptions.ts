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
}

interface AddLabel {
  name: string;
}

interface AddLocation {
  title: string;
  storeId: number;
}

interface AddColor {
  name: string;
}

interface AddUnit {
  name: string;
  symbol: string;
}

interface AddCategory {
  title: string;
  parentCategoryId: number;
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
