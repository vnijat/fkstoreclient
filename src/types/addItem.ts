export interface AddItemInterface {
  name: string;
  description?: string;
  purchasePrice: number;
  pricePerUnit: number;
  quantity: number;
  unitId: number;
  supplierId: number;
  barCodeId: number;
  categoryId: number;
  locationId: number;
  storeId: number;
  color?: string;
}
