interface IColumnHeader {
  title: string;
  dtoKey: string;
  sortable?: boolean;
}

export const columnHeaders: IColumnHeader[] = [
  {title: 'Name', dtoKey: 'name', sortable: true},
  {title: 'Description', dtoKey: 'description'},
  {title: 'Barcode', dtoKey: 'barcode'},
  {title: 'Category', dtoKey: 'category'},
  {title: 'Color', dtoKey: 'color'},
  {title: 'Unit', dtoKey: 'unit'},
  {title: 'Quantity', dtoKey: 'quantity', sortable: true},
  {title: 'Price Per Unit', dtoKey: 'purchasePrice', sortable: true},
  {title: 'Total Price', dtoKey: 'totalPrice', sortable: true},
];
