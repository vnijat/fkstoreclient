interface IProjectColumnsTitle {
    title: string;
    dtoKey: string;
    sortable?: boolean;
}

export const ProjectColumnsTitle: IProjectColumnsTitle[] = [
    { title: 'Client', dtoKey: 'client' },
    { title: 'Title', dtoKey: 'title', sortable: true },
    { title: 'Description', dtoKey: 'description' },
    { title: 'Price', dtoKey: 'price' },
    { title: 'Other Expenses', dtoKey: 'otherExpensesTotalCost' },
    { title: 'Total Price', dtoKey: 'totalPrice' },
    { title: 'Paid', dtoKey: 'paid' },
    { title: 'Un Paid', dtoKey: 'unPaid' },
    { title: 'Deadline', dtoKey: 'deadline' },
    { title: 'Status', dtoKey: 'totalPrice', sortable: true },
];
