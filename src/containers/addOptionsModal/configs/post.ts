import {inventoryApi} from '../../../modules/api/apiSlice';

const POST_OPTIONS = {
  color: inventoryApi.endpoints.addColor,
  unit: inventoryApi.endpoints.addUnit,
  supplier: inventoryApi.endpoints.addSupplier,
  category: inventoryApi.endpoints.addCategory,
  location: inventoryApi.endpoints.addLocation,
  label: inventoryApi.endpoints.addLabel,
  store: inventoryApi.endpoints.addStore,
  barcode: inventoryApi.endpoints.addBarcode,
};

export default POST_OPTIONS;
