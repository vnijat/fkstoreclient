import {ITableDataConfig} from '../../../containers/simpleTable/types';
import {InventoryTransfers} from '../../../types/inventory';

export const inventoryTransfersTableConfig: ITableDataConfig<InventoryTransfers>[] =
  [
    {
      headerTitle: 'Date',
      dtoKey: 'updatedAt',
      type: 'date',
      hidden: false,
    },
    {
      headerTitle: 'Origin Store',
      dtoKey: 'originalStore',
      customColumnKey: 'originalStore',
      hidden: false,
    },
    {
      headerTitle: 'Transfered From',
      dtoKey: 'transferedFromItem',
      customColumnKey: 'transferedFromItem',
      hidden: false,
    },
    {
      headerTitle: 'Transfered Store',
      dtoKey: 'destinationStore',
      customColumnKey: 'destinationStore',
      hidden: false,
    },
    {
      headerTitle: 'Generated Item',
      dtoKey: 'generatedItem',
      customColumnKey: 'generatedItem',
      hidden: false,
    },
    
    {
      headerTitle: 'Quantity',
      dtoKey: 'quantity',
      type: 'numeric',
      hidden: false,
    },
    {
      headerTitle: 'Transfered To',
      dtoKey: 'transferedToItem',
      customColumnKey: 'transferedToItem',
      hidden: false,
    },
  ];
