import {ItemOptionsPostApi} from '../../../modules/api/itemOptionsPost.api';

const POST_OPTIONS = {
  color: ItemOptionsPostApi.endpoints.addColor,
  unit: ItemOptionsPostApi.endpoints.addUnit,
  supplier: ItemOptionsPostApi.endpoints.addSupplier,
  category: ItemOptionsPostApi.endpoints.addCategory,
  location: ItemOptionsPostApi.endpoints.addLocation,
  label: ItemOptionsPostApi.endpoints.addLabel,
  store: ItemOptionsPostApi.endpoints.addStore,
  barcode: ItemOptionsPostApi.endpoints.addBarcode,
};

export default POST_OPTIONS;
