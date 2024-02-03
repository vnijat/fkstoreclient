import {ITableDataConfig} from '../../../containers/simpleTable/types';
import {InventoryTrackData} from '../../../types/inventoryTrack';

export const inventoryTrackTableConfig: ITableDataConfig<InventoryTrackData>[] =
  [
    {
      headerTitle: 'Date',
      dtoKey: 'updatedat',
      type: 'date',
      hidden: false,
    },
    {
      headerTitle: 'Store',
      dtoKey: 'storename',
      type: 'text',
      hidden: false,
    },
    {
      headerTitle: 'Product Name',
      dtoKey: 'name',
      type: 'text',
      hidden: false,
    },
    {
      headerTitle: 'Barcode',
      dtoKey: 'barcode',
      type: 'text',
      hidden: false,
    },
    {
      headerTitle: 'Unit',
      dtoKey: 'unit',
      type: 'text',
      hidden: false,
    },
    {
      headerTitle: 'Quantity',
      dtoKey: 'quantity',
      type: 'numeric',
      hidden: false,
    },
    {
      headerTitle: 'Status',
      customColumnKey: 'status',
      hidden: false,
    },
  ];
