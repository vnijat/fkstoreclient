interface IOrdersColumnTitle {
    title: string;
    dtoKey: string;
    sortable?: boolean;
}

export const OrdersColumnTitle: IOrdersColumnTitle[] = [
    { title: 'Date', dtoKey: 'createdAt' },
    { title: 'Project', dtoKey: 'project' },
    { title: 'Total Items', dtoKey: 'totalItems' },
    { title: 'Total Cost', dtoKey: 'totalPrice' },
    { title: 'Status', dtoKey: 'status' }
];
