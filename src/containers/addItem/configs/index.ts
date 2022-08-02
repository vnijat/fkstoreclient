const inputsConfig = [
  {
    title: 'Name',
    isNumeric: false,
    maxLength: 200,
    placeHolder: 'Name',
    width: 500,
    height: 35,
    multiLine: false,
  },
  {
    title: 'Description',
    isNumeric: false,
    maxLength: 200,
    placeHolder: 'Description',
    width: 500,
    height: 150,
    multiLine: true,
  },
  {
    title: 'Quantity',
    isNumeric: true,
    maxLength: 16,
    placeHolder: '0',
    width: 150,
    height: 35,
    multiLine: false,
  },
  {
    title: 'Purchase Price',
    isNumeric: true,
    maxLength: 16,
    placeHolder: '0',
    width: 150,
    height: 35,
    multiLine: false,
  },
  {
    title: 'Price Per Unit',
    isNumeric: true,
    maxLength: 16,
    placeHolder: '0',
    width: 150,
    height: 35,
    multiLine: false,
  },

  {
    title: 'Unit',
    width: 150,
    height: 35,
    selectable: true,
  },
  {
    title: 'Barcode',
    width: 150,
    height: 35,
    selectable: true,
  },
  {
    title: 'Color',
    width: 150,
    height: 35,
    selectable: true,
  },
  {
    title: 'Label',
    width: 150,
    height: 35,
    selectable: true,
  },

  {
    title: 'Category',
    width: 150,
    height: 35,
    selectable: true,
  },
  {
    title: 'Store',
    width: 150,
    height: 35,
    selectable: true,
  },
  {
    title: 'Location',
    width: 150,
    height: 35,
    selectable: true,
  },
  {
    title: 'Supplier',
    width: 150,
    height: 35,
    selectable: true,
  },
];

export {inputsConfig};
