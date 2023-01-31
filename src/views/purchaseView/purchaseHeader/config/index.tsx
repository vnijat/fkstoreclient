interface IPurchaseColumnTitle {
    title: string;
    dtoKey: string;
    sortable?: boolean;
}

export const PurchaseColumnTitle: IPurchaseColumnTitle[] = [
    { title: 'Date', dtoKey: 'createdAt' },
    { title: 'detail', dtoKey: 'detail' },
    { title: 'Total Items', dtoKey: 'totalItems' },
    { title: 'Total Cost', dtoKey: 'totalPrice' },
    { title: 'Status', dtoKey: 'status' }
];
