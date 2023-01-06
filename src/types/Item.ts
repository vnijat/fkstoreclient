export interface AddItemInterface {
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
  barcodeId?: string;
  categoryId?: string;
  locationId?: string;
  labelId?: string;
  storeId?: string;
  colorId?: string;
}
